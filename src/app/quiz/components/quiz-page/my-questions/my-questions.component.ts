import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizItem } from 'src/app/quiz/models/question.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';
import { UserService } from 'src/app/quiz/services/user/user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss'],
})
export class MyQuestionsComponent implements OnInit, OnDestroy {
  myQuestionIDs!: string[];

  quizItems!: QuizItem[];

  isLoading: boolean = true;

  isSignedInSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private quizService: QuizService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.isSignedInSubscription = this.userService
      .isSignedIn()
      .subscribe((isSignedIn) => {
        if (!isSignedIn) {
          this.router.navigate(['/sign-in']);
        } else {
          this.getData();
        }
      });
  }

  ngOnDestroy(): void {
    this.isSignedInSubscription.unsubscribe();
  }

  getData(): void {
    if (!this.userService.user) {
      this.userService.fetchUserByID().then((user) => {
        this.myQuestionIDs = user.questions;
        this.fetchQuestions();
      });
    } else {
      this.myQuestionIDs = this.userService.user.questions;
      this.fetchQuestions();
    }
  }

  fetchQuestions(): void {
    this.quizService
      .fetchQuestionsByIDs(this.myQuestionIDs)
      .subscribe((questions: QuizItem[]) => {
        this.quizItems = questions;
        this.isLoading = false;
      });
  }

  onDeleteQuestion(id: string, index: number): void {
    this.quizItems.splice(index, 1);

    this.quizService.deleteQuestion(id);
    this.userService.deleteQuestionID(id);

    this.openSnackBar();
  }

  getRouterLink(id: string): string {
    return `edit/${id}`;
  }

  openSnackBar(): void {
    this.snackBar.openSnackBar('Question deleted', 3000);
  }
}
