import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
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
    
  }

  async onSubmit(): Promise<void> {
    const isUsernameTaken: boolean = await this.userService
      .isUsernameRegistered(this.usernameFormControl.value)
      .then((data) => data);

    if (
      this.usernameFormControl.valid &&
      this.passwordFormControl.value === this.repeatPasswordFormControl.value &&
      !isUsernameTaken
    ) {
      console.log('here');
      this.userService.onRegister({
        username: this.usernameFormControl.value,
        password: this.passwordFormControl.value,
      });
    }
  }
}
