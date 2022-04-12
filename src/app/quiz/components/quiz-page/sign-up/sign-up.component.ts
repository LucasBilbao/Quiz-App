import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  passwordValuesAreEqual,
  strongPassword,
} from 'src/app/quiz/utils/validators/password.validator';
import { getUsernameExistenceValidator } from 'src/app/quiz/utils/validators/username.validator';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
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

  constructor(private userService: UserService) {}

  async onSubmit(): Promise<void> {
    this.userService.onRegister({
      username: this.userForm.value.name,
      password: this.userForm.value.password,
    });
  }
}
