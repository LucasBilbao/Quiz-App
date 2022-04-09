import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/quiz/models/question.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  questions!: Question[];

  isLoading: boolean = true;

  chosenQuestions: Question[] = [];

  constructor(
    private userService: UserService,
    private quizServices: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userService.isSignedIn) {
      this.router.navigate(['/sign-in']);
    } else {
      this.quizServices.fetchQuestions().then((questions) => {
        this.questions = questions;
        this.isLoading = false;
      });
    }
  }

  isChosen(question: Question): boolean {
    return this.chosenQuestions.includes(question);
  }

  addQuestion(question: Question): void {
    this.chosenQuestions.push(question);
  }

  removeQuestion(id: string): void {
    this.chosenQuestions = this.chosenQuestions.filter(
      (question) => question.id !== id
    );
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
