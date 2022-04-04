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

  register(userCredentials: UserCredentials): void {
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

  putScore(score: string): void {
    this.user.scoreHistory.push({ score, date: new Date() });
    console.log(this.user.scoreHistory);
    this.http
      .put(`${this.url}/${this.user.id}`, {
        ...this.user,
        scoreHistory: this.user.scoreHistory,
      })
      .subscribe((user) => {});
  }

  fetchUserByID(): void {
    this.http
      .get(`${this.url}/${localStorage.getItem('userID')}`)
      .subscribe((user) => {
        this.user = user as User;
      });
  }

  putQuestion(questionID: string): void {
    this.user.myQuestions.push(questionID);
    this.http
      .put(`${this.url}/${this.user.id}`, {
        ...this.user,
        myQuestions: this.user.myQuestions,
      })
      .subscribe((user) => {});
  }
}
