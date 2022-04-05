import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/quiz/models/user.model';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required]);

  passwordFormControl = new FormControl('', [Validators.required]);

  hidePassword = true;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.isSignedIn) {
      this.router.navigate(['/quiz']);
    }
  }

  signIn(): void {
    if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
      const userCredentials: UserCredentials = {
        username: this.usernameFormControl.value,
        password: this.passwordFormControl.value,
      };
      this.userService.onSignIn(userCredentials);
    }
  }
}
