import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/quiz/services/user/user.service';
import { QuizItem } from '../../../models/question.model';
import { QuizService } from '../../../services/quiz/quiz.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  quizItems: QuizItem[] = [];

  progress: any = {};

  currentQuizItemIndex: number = 0;

  isLoading: boolean = true;

  isGameOver: boolean = false;

  isSignedInSubscription!: Subscription;

  constructor(
    private quizServices: QuizService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isSignedInSubscription = this.userService
      .isSignedIn()
      .subscribe((isSignedIn) => {
        if (!isSignedIn) {
          this.router.navigate(['/sign-in']);
        } else {
          if (this.quizServices.quizItems) {
            this.quizItems = this.quizServices.getShuffledQuestions(
              this.quizServices.quizItems
            );
            this.isLoading = false;
          } else {
            this.quizServices.fetchQuestions().subscribe((questions) => {
              this.quizItems =
                this.quizServices.getShuffledQuestions(questions);
              this.isLoading = false;
            });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.isSignedInSubscription.unsubscribe();
  }

  onNextClick(): void {
    if (this.currentQuizItemIndex !== this.quizItems.length - 1) {
      this.currentQuizItemIndex += 1;
    } else {
      this.currentQuizItemIndex = 0;
      this.gameOver();
    }
  }

  getScore(): number {
    return this.quizServices.score;
  }

  gameOver(): void {
    this.isGameOver = true;
    setTimeout(() => {
      this.quizServices.score = 0;
      this.router.navigate(['/quiz']);
    }, 5000);

    this.userService.putScore(this.getScore(), this.quizItems.length);
  }

  onUpdateProgressCircle(isCorrectlyAnswered: boolean): void {
    this.progress[this.currentQuizItemIndex] = isCorrectlyAnswered;
  }
}
