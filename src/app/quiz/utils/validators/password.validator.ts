import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function passwordValuesAreEqual(
  control: AbstractControl
): ValidationErrors | null {
  const formGroup = control as FormGroup;

  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  return password === confirmPassword
    ? null
    : { passwordValuesDoNotMatch: true };
}

export function strongPassword(
  control: AbstractControl
): ValidationErrors | null {
  const [isStrongPassword, errors] = isEachCriteriaMet(control.value);

  return isStrongPassword
    ? null
    : {
        hasNoUpperCaseLetters: !errors.hasUpperCaseLetters,
        hasNoLowerCaseLetters: !errors.hasLowerCaseLetters,
        isNotPasswordLongEnough: !errors.isPasswordLongEnough,
        hasWhiteSpaces: !errors.hasNoWhiteSpaces,
        hasNoDigits: !errors.hasDigits,
        hasNoSpecialCharacters: !errors.hasSpecialCharacters,
      };
}

function isEachCriteriaMet(password: string) {
  const hasUpperCaseLetters: boolean = /[A-Z]+/g.test(password);
  const hasLowerCaseLetters: boolean = /[a-z]+/g.test(password);
  const isPasswordLongEnough: boolean = password.length >= 8;
  const hasNoWhiteSpaces: boolean = !/\s+/g.test(password);
  const hasDigits: boolean = /\d+/g.test(password);
  const hasSpecialCharacters: boolean = /[!@#$%^&*(),.?":{}|<>\[\]\\\-]+/g.test(
    password
  );

  const errors: any = {
    hasUpperCaseLetters,
    hasLowerCaseLetters,
    isPasswordLongEnough,
    hasNoWhiteSpaces,
    hasDigits,
    hasSpecialCharacters,
  };

  return [
    hasUpperCaseLetters &&
      hasLowerCaseLetters &&
      isPasswordLongEnough &&
      hasNoWhiteSpaces &&
      hasDigits &&
      hasSpecialCharacters,
    errors,
  ];
}
