import { Component, OnInit } from '@angular/core';
import { Question } from '../../../models/question.model';
import { QuizService } from '../../../services/quiz/quiz.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];

  isLoading: boolean = true;

  constructor(private quizServices: QuizService) {}

  ngOnInit(): void {
    this.quizServices.fetchQuestions().then((questions) => {
      this.questions = questions;
      this.isLoading = false;
    });
  }

  show(): string {
    return JSON.stringify(this.questions, null, 2);
  }
}
