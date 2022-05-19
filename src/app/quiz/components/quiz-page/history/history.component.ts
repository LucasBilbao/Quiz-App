import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScoreInfo } from 'src/app/quiz/models/user.model';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  displayedColumns: string[] = ['score', 'percentage', 'date', 'time'];

  scoreHistory: ScoreInfo[] = [];

  isSignedInSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isSignedInSubscription = this.userService
      .isSignedIn()
      .subscribe((isSignedIn) => {
        if (!isSignedIn) {
          this.router.navigate(['/sign-in']);
        } else {
          if (!this.userService.user) {
            this.userService.fetchUserByID().then((user) => {
              this.scoreHistory = user.scoreHistory;
              this.isLoading = false;
            });
          } else {
            this.scoreHistory = this.userService.user.scoreHistory;
            this.isLoading = false;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.isSignedInSubscription.unsubscribe();
  }

  getPercentage(score: number, maxScore: number): number {
    return Math.round((score / maxScore) * 100);
  }
}
