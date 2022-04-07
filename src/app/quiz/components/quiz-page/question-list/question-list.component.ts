import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/quiz/models/question.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  questions!: Question[];

  isLoading: boolean = true;

  chosenQuestions: Question[] = [];

  constructor(private quizServices: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizServices.fetchQuestions().then((questions) => {
      this.questions = this.quizServices.questions;
      this.isLoading = false;
    });
  }

  isChosen(question: Question): boolean {
    return this.chosenQuestions.includes(question);
  }

  addQuestion(question: Question): void {
    this.chosenQuestions.push(question);
  }

  removeQuestion(id: string): void {
    const index: number = this.chosenQuestions.findIndex(
      (question) => question.id === id
    );

    this.chosenQuestions.splice(index, 1);
  }

  onSelectAll(): void {
    if (this.isEachQuestionChosen()) this.chosenQuestions = [];
    else this.chosenQuestions = new Array(...this.questions);
  }

  isEachQuestionChosen(): boolean {
    return this.chosenQuestions.length === this.questions.length;
  }

  onStartGame(): void {
    this.quizServices.questions = this.chosenQuestions;

    this.router.navigate(['quiz', 'questions']);
  }
}
