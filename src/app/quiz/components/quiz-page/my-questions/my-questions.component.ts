import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Question } from 'src/app/quiz/models/question.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss'],
})
export class MyQuestionsComponent implements OnInit {
  myQuestionIDs!: string[];

  questions!: Question[];

  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private quizService: QuizService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.userService.isSignedIn) {
      this.router.navigate(['/sign-in']);
    } else {
      this.getData();
    }
  }

  getData(): void {
    if (!this.userService.user) {
      this.userService.fetchUserByID().then((user) => {
        this.myQuestionIDs = user.myQuestions;
        this.fetchQuestions();
      });
    } else {
      this.myQuestionIDs = this.userService.user.myQuestions;
      this.fetchQuestions();
    }
  }

  fetchQuestions(): void {
    this.quizService
      .fetchQuestionsByIDs(this.myQuestionIDs)
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        this.isLoading = false;
      });
  }

  onDeleteQuestion(id: string, index: number): void {
    this.questions.splice(index, 1);

    this.quizService.deleteQuestion(id);
    this.userService.deleteQuestionID(id);

    this.openSnackBar()
  }

  routerLink(id: string): string {
    return `edit/${id}`;
  }

  openSnackBar(): void {
    this._snackBar.open('Question deleted', '', {
      duration: 3000,
    });
  }
}
