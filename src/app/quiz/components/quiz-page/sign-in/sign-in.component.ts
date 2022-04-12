import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userCredentialsCheck } from 'src/app/quiz/utils/validators/user-sign-in.validator';
import { UserCredentials } from 'src/app/quiz/models/user.model';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  userForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    },
    [],
    [userCredentialsCheck(this.userService)]
  );

  hidePassword = true;

  hasTriedToSignIn: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.isSignedIn) {
      this.router.navigate(['/quiz']);
    }
  }

  onInput(): void {
    if (this.hasTriedToSignIn) this.hasTriedToSignIn = false;
  }

  signIn(): void {
    if (this.userForm.valid) {
      const userCredentials: UserCredentials = {
        username: this.userForm.get('name')?.value,
        password: this.userForm.get('password')?.value,
      };

      this.userService.onSignIn(userCredentials);
    }

    this.hasTriedToSignIn = true;
  }
}
