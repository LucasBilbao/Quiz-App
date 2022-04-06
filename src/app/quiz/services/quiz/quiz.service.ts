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

  score: number = 0;

  constructor(private http: HttpClient) {}

  async fetchQuestions(): Promise<Question[]> {
    this.http.get<Question[]>(this.url).subscribe((questions) => {
      this.questions = questions;
    });

    return new Promise((res) => {
      setTimeout(() => {
        res(this.questions);
      }, 500);
    });
  }

  getShuffledQuestions(): Question[] {
    return this.questions.sort(() => Math.random() - 0.5);
  }

  postNewQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.url, question);
  }
}
