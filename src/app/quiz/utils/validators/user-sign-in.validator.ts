import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, debounceTime, debounce, interval } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import Debounce from '/node_modules/debounce-decorator/dist/Debounce';

export function userCredentialsCheck(
  userService: UserService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username: string = control.get('name')?.value;
    const password: string = control.get('password')?.value;

    @Debounce()
    return userService.fetchUsersByUsername(username).pipe(
      map((res) => {
        if (res.length === 0) return { incorrectCredentials: true };
        const isEachCredentialCorrect =
          res[0].credentials.username === username &&
          res[0].credentials.password === password;

        return isEachCredentialCorrect ? null : { incorrectCredentials: true };
      })
    );
  };
}
