import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userCredentialsCheck } from 'src/app/quiz/utils/validators/user-sign-in.validator';
import { Credentials } from 'src/app/quiz/models/user.model';
import { UserService } from 'src/app/quiz/services/user/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
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

  isSignedInSubscription!: Subscription;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.isSignedInSubscription = this.userService
      .isSignedIn()
      .subscribe((isSignedIn) => {
        if (isSignedIn) {
          this.router.navigate(['/quiz']);
        }
      });
  }

  ngOnDestroy(): void {
    this.isSignedInSubscription.unsubscribe();
  }

  onInput(): void {
    if (this.hasTriedToSignIn) this.hasTriedToSignIn = false;
  }

  signIn(): void {
    if (this.userForm.valid) {
      const credentials: Credentials = {
        username: this.userForm.get('name')?.value,
        password: this.userForm.get('password')?.value,
      };

      this.userService.signIn(credentials);
    }

    this.hasTriedToSignIn = true;
  }
}
