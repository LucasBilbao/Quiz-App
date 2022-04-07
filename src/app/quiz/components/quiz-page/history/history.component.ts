import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
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

  getPercentage(score: number, maxScore: number): number {
    return Math.round((score / maxScore) * 100);
  }
}
