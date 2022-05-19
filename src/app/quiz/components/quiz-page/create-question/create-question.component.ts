import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit, OnDestroy {
  isSignedInSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isSignedInSubscription = this.userService
      .isSignedIn()
      .subscribe((isSignedIn) => {
        if (!isSignedIn) {
          this.router.navigate(['/sign-in']);
        }
      });
  }

  ngOnDestroy(): void {
    this.isSignedInSubscription.unsubscribe();
  }
}
