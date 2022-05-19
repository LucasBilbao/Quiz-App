import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { UserService } from '../../services/user/user.service';

export function getUsernameExistenceValidator(
  userService: UserService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userService.fetchUsersByUsername(control.value).pipe(
      map((res) => {
        return res.length === 0 ? null : { usernameExists: true };
      })
    );
  };
}
