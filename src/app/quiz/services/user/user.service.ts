import { Injectable } from '@angular/core';
import { User, UserCredentials } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { getUniqueID } from '../../assets/getUniqueID';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'users';

  user!: User;

  isSignedIn!: boolean;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('isSignedIn') === null) {
      this.changeIsSignedInStatus(false);
    }

    this.isSignedIn = localStorage.getItem('isSignedIn') === 'true';

    if (this.isSignedIn) {
      this.fetchUserByID();
    }
  }

  onRegister(userCredentials: UserCredentials): void {
    const userInfo: User = {
      id: getUniqueID(),
      userCredentials,
      scoreHistory: [],
      myQuestions: [],
    };

    this.http.post(this.url, userInfo).subscribe((user) => {
      this.signIn(user as User);
    });
  }

  async onSignIn(signInCredentials: UserCredentials): Promise<void> {
    this.http
      .get<User[]>(
        `${this.url}?userCredentials.username=${signInCredentials.username}`
      )
      .subscribe((res) => {
        if (res.length !== 0) {
          const user: User | undefined = this.findUserByCredentials(
            res,
            signInCredentials
          );

          if (user) {
            this.signIn(user);
          }
        }
      });
  }

  onLogOut(): void {
    this.changeIsSignedInStatus(false);

    localStorage.removeItem('userID');
    this.user = {} as User;
    location.reload();
  }

  signIn(user: User): void {
    this.changeIsSignedInStatus(true);

    if (localStorage.getItem('userID') === null && this.isSignedIn) {
      localStorage.setItem('userID', user.id);
    }

    this.user = user as User;
    location.reload();
  }

  putScore(score: number, maxScore: number): void {
    this.user.scoreHistory.unshift({ score, maxScore, date: new Date() });
    this.http
      .put(`${this.url}/${this.user.id}`, {
        ...this.user,
        scoreHistory: this.user.scoreHistory,
      })
      .subscribe((user) => {});
  }

  fetchUserByID(): Promise<User> {
    this.http
      .get(`${this.url}/${localStorage.getItem('userID')}`)
      .subscribe((user) => {
        this.user = user as User;
      });

    return new Promise((res) => {
      setTimeout(() => {
        res(this.user);
      }, 500);
    });
  }

  putQuestion(questionID: string): void {
    this.user.myQuestions.unshift(questionID);
    this.http
      .put(`${this.url}/${this.user.id}`, {
        ...this.user,
        myQuestions: this.user.myQuestions,
      })
      .subscribe();
  }

  fetchUsersByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.url}?userCredentials.username=${username}`
    );
  }

  changeIsSignedInStatus(status: boolean): void {
    localStorage.setItem('isSignedIn', `${status}`);
    this.isSignedIn = status;
  }

  isEachCredentialCorrect(
    userCredentials: UserCredentials,
    signedCredentials: UserCredentials
  ): boolean {
    return (
      userCredentials.username === signedCredentials.username &&
      userCredentials.password === signedCredentials.password
    );
  }

  findUserByCredentials(
    users: User[],
    signedCredentials: UserCredentials
  ): User | undefined {
    return users.find((user) => {
      return this.isEachCredentialCorrect(
        user.userCredentials,
        signedCredentials
      );
    });
  }

  deleteQuestionID(id: string): void {
    this.user.myQuestions = this.user.myQuestions.filter((qID) => qID !== id);

    this.http.put(`${this.url}/${this.user.id}`, this.user).subscribe();
  }
}
