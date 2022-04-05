import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreInfo } from 'src/app/quiz/models/user.model';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  isLoading: boolean = true;
  displayedColumns: string[] = ['score', 'percentage', 'date', 'time'];

  scoreHistory: ScoreInfo[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if (!this.userService.isSignedIn) {
      this.router.navigate(['/sign-in']);
    }

    this.userService.fetchUserByID().then(() => {});

    setTimeout(() => {
      this.scoreHistory = this.userService.user.scoreHistory;
      this.isLoading = false;
    }, 2500);
  }

  getPercentage(score: number, maxScore: number): number {
    return Math.round((score / maxScore) * 100);
  }
}
