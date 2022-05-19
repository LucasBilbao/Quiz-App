import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  passwordValuesAreEqual,
  strongPassword,
} from 'src/app/quiz/utils/validators/password.validator';
import { getUsernameExistenceValidator } from 'src/app/quiz/utils/validators/username.validator';
import { UserService } from 'src/app/quiz/services/user/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  userForm: FormGroup = new FormGroup(
    {
      name: new FormControl(
        '',
        [Validators.required, Validators.minLength(5)],
        [getUsernameExistenceValidator(this.userService)]
      ),
      password: new FormControl('', [Validators.required, strongPassword]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: passwordValuesAreEqual,
    }
  );

  hidePassword = true;

  isSignedInSubscription!: Subscription;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.isSignedInSubscription = this.userService
      .isSignedIn()
      .subscribe((isSignedIn) => {
        if (isSignedIn) {
          this.router.navigate(['quiz']);
        }
      });
  }

  ngOnDestroy(): void {
    this.isSignedInSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.userService.register({
      username: this.userForm.value.name,
      password: this.userForm.value.password,
    });
  }
}
