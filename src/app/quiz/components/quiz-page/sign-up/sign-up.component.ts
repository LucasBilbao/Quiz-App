import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  passwordValuesAreEqual,
  strongPassword,
} from 'src/app/quiz/assets/validators/password.validator';
import { getUsernameExistenceValidator } from 'src/app/quiz/assets/validators/username.validator';
import { UserService } from 'src/app/quiz/services/user/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    this.userService.onRegister({
      username: this.userForm.value.name,
      password: this.userForm.value.password,
    });
  }
}
