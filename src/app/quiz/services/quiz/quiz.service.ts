import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  url: string = 'questions';

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

  putQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.url}/${question.id}`, question);
  }

  fetchQuestionsByIDs(ids: string[]): Observable<Question[]> {
    let fetchURL: string = this.url;

    ids.forEach((id: string, index: number) => {
      if (index === 0) {
        fetchURL = `${fetchURL}?id=${id}&`;
      } else if (index === ids.length - 1) {
        fetchURL = `${fetchURL}id=${id}`;
      } else {
        fetchURL = `${fetchURL}id=${id}&`;
      }
    });

    return this.http.get<Question[]>(`${fetchURL}`);
  }

  deleteQuestion(id: string): void {
    this.http.delete(`${this.url}/${id}`).subscribe();
  }
}
