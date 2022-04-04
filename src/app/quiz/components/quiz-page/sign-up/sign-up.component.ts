import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/quiz/services/user/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required]);

  passwordFormControl = new FormControl('', [Validators.required]);
  repeatPasswordFormControl = new FormControl('', [Validators.required]);

  hidePassword = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.userService.isSignedIn) {
      this.router.navigate(['/quiz']);
    }
  }

  onSubmit(): void {
    if (
      this.passwordFormControl.value === this.repeatPasswordFormControl.value
    ) {
      this.userService.register({
        username: this.usernameFormControl.value,
        password: this.passwordFormControl.value,
      });
    }
  }
}
