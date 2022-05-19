import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizItem } from 'src/app/quiz/models/question.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit, OnDestroy {
  quizItems!: QuizItem[];

  isLoading: boolean = true;

  chosenQuestions: QuizItem[] = [];

  isSignedInSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private quizServices: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isSignedInSubscription = this.userService
      .isSignedIn()
      .subscribe((isSignedIn) => {
        if (!isSignedIn) {
          this.router.navigate(['/sign-in']);
        } else {
          this.quizServices.fetchQuestions().subscribe((quizItems) => {
            this.quizItems = quizItems;
            this.isLoading = false;
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.isSignedInSubscription.unsubscribe();
  }

  isChosen(quizItem: QuizItem): boolean {
    return this.chosenQuestions.includes(quizItem);
  }

  addQuestion(quizItem: QuizItem): void {
    this.chosenQuestions.push(quizItem);
  }

  removeQuestion(id: string): void {
    this.chosenQuestions = this.chosenQuestions.filter(
      (quizItem) => quizItem.id !== id
    );
  }

  onSelectAll(): void {
    if (this.isEachQuestionChosen()) this.chosenQuestions = [];
    else this.chosenQuestions = new Array(...this.quizItems);
  }

  isEachQuestionChosen(): boolean {
    return this.chosenQuestions.length === this.quizItems.length;
  }

  onStartGame(): void {
    this.quizServices.quizItems = this.chosenQuestions;

    this.router.navigate(['quiz', 'questions']);
  }
}
