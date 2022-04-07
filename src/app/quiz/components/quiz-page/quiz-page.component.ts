import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent {
  constructor(private userService: UserService, private router: Router) {
    if (this.userService.isSignedIn) {
      this.router.navigate(['/quiz']);
    }
  }
}
