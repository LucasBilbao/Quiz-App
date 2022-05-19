import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { QuizItem } from '../../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  url: string = 'questions';

  quizItems!: QuizItem[];

  score: number = 0;

  constructor(private http: HttpClient) {}

  fetchQuestions(): Observable<QuizItem[]> {
    return this.http.get<QuizItem[]>(this.url).pipe(delay(500));
  }

  getShuffledQuestions(quizItems: QuizItem[]): QuizItem[] {
    return quizItems.sort(() => Math.random() - 0.5);
  }

  postNewQuestion(quizItem: QuizItem): Observable<QuizItem> {
    return this.http.post<QuizItem>(this.url, quizItem);
  }

  putQuestion(quizItem: QuizItem): Observable<QuizItem> {
    return this.http.put<QuizItem>(`${this.url}/${quizItem.id}`, quizItem);
  }

  fetchQuestionsByIDs(ids: string[]): Observable<QuizItem[]> {
    if (ids.length === 0) return of([]);

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

    return this.http.get<QuizItem[]>(`${fetchURL}`);
  }

  deleteQuestion(id: string): void {
    this.http.delete(`${this.url}/${id}`).subscribe();
  }
}
