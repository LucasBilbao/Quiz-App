import { Injectable } from '@angular/core';
import { User, UserCredentials } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000/users';

  user!: User;

  isSignedIn!: boolean;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('isSignedIn') === null) {
      localStorage.setItem('isSignedIn', 'false');
    }
    this.setIsSignedWithStorage();

    if (this.isSignedIn) {
      this.fetchUserByID();
    }
  }

  onRegister(userCredentials: UserCredentials): void {
    const userInfo: User = {
      id: this.getUniqueID(),
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
          res.forEach((user) => {
            if (
              user.userCredentials.password === signInCredentials.password &&
              user.userCredentials.username === signInCredentials.username
            ) {
              this.signIn(user);
            }
          });
        }
      });
  }

  onLogOut(): void {
    localStorage.setItem('isSignedIn', 'false');
    this.setIsSignedWithStorage();
    localStorage.removeItem('userID');
    this.user = {} as User;
    location.reload();
  }

  signIn(user: User): void {
    localStorage.setItem('isSignedIn', 'true');

    this.setIsSignedWithStorage();

    if (localStorage.getItem('userID') === null && this.isSignedIn) {
      localStorage.setItem('userID', user.id);
    }

    this.user = user as User;
    location.reload();
  }

  getUniqueID(): string {
    return new Date().getTime().toString();
  }

  setIsSignedWithStorage(): void {
    this.isSignedIn = localStorage.getItem('isSignedIn') === 'true';
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
      .subscribe((user) => {});
  }

  async isUsernameRegistered(username: string): Promise<boolean> {
    let isUsernameTaken: any;
    this.http
      .get<User[]>(`${this.url}?userCredentials.username=${username}`)
      .subscribe((res) => {
        isUsernameTaken = res.length !== 0;
      });

    return new Promise((res) => {
      setTimeout(() => {
        res(isUsernameTaken);
      }, 500);
    });
  }
}
