import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  url: string = 'http://localhost:3000/questions';

  questions: Question[] = [];

  constructor(private http: HttpClient) {}

  async fetchQuestions(): Promise<Question[]> {
    this.http.get<Question[]>(this.url).subscribe((questions) => {
      this.questions = questions;
      // console.log(this.questions);
    });

    return new Promise((res) => {
      setTimeout(() => {
        res(this.questions);
      }, 2500);
    });
  }
}
