import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UserService } from '../../services/user/user.service';

export function userCredentialsCheck(
  userService: UserService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username: string = control.get('name')?.value;
    const password: string = control.get('password')?.value;

    return userService.fetchUsersByUsername(username).pipe(
      map((res) => {
        if (res.length === 0) return { incorrectCredentials: true };
        const isEachCredentialCorrect =
          res[0].userCredentials.username === username &&
          res[0].userCredentials.password === password;

        return isEachCredentialCorrect ? null : { incorrectCredentials: true };
      })
    );
  };
}
