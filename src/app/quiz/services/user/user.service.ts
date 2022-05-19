import { Injectable } from '@angular/core';
import { User, Credentials } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { getUniqueID } from '../../utils/getUniqueID';
import { debounce, debounceTime, interval, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'users';

  user!: User;

  constructor(private http: HttpClient) {
    if (
      localStorage.getItem('isSignedIn') === null ||
      !localStorage.getItem('userID')
    ) {
      this.changeIsSignedInStatus(false);
    } else {
      this.changeIsSignedInStatus(true);
    }

    this.isSignedIn().subscribe((isSignedIn) => {
      if (isSignedIn) {
        this.fetchUserByID();
      }
    });
  }

  register(credentials: Credentials): void {
    const userInfo: User = {
      id: getUniqueID(),
      credentials: credentials,
      scoreHistory: [],
      questions: [],
    };

    this.http.post(this.url, userInfo).subscribe((user) => {
      this.authorize(user as User);
    });
  }

  async signIn(signInCredentials: Credentials): Promise<void> {
    this.http
      .get<User[]>(
        `${this.url}?credentials.username=${signInCredentials.username}`
      )
      .subscribe((res) => {
        if (res.length !== 0) {
          const user: User | undefined = this.findUserByCredentials(
            res,
            signInCredentials
          );

          if (user) {
            this.authorize(user);
          }
        }
      });
  }

  logOut(): void {
    this.changeIsSignedInStatus(false);

    localStorage.removeItem('userID');
    this.user = {} as User;
    location.reload();
  }

  authorize(user: User): void {
    this.changeIsSignedInStatus(true);

    if (!localStorage.getItem('userID') && this.isSignedIn) {
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
      .subscribe(() => {});
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
    this.user.questions.unshift(questionID);
    this.http
      .put(`${this.url}/${this.user.id}`, {
        ...this.user,
        questions: this.user.questions,
      })
      .subscribe();
  }

  fetchUsersByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.url}?credentials.username=${username}`
    ).pipe(debounce(() => interval(5000)));
  }

  changeIsSignedInStatus(status: boolean): void {
    localStorage.setItem('isSignedIn', `${status}`);
  }

  isEachCredentialCorrect(
    credentials: Credentials,
    signedCredentials: Credentials
  ): boolean {
    return (
      credentials.username === signedCredentials.username &&
      credentials.password === signedCredentials.password
    );
  }

  findUserByCredentials(
    users: User[],
    signedCredentials: Credentials
  ): User | undefined {
    return users.find((user) => {
      return this.isEachCredentialCorrect(user.credentials, signedCredentials);
    });
  }

  deleteQuestionID(id: string): void {
    this.user.questions = this.user.questions.filter((qID) => qID !== id);

    this.http.put(`${this.url}/${this.user.id}`, this.user).subscribe();
  }

  isSignedIn(): Observable<boolean> {
    return of(localStorage.getItem('isSignedIn') === 'true');
  }
}
