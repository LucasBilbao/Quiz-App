import { AbstractControl, ValidationErrors } from '@angular/forms';

export function duplicateOptions(
  control: AbstractControl
): ValidationErrors | null {
  const options: string[] = control.value;

  let hasDuplicates: boolean = false;

  for (let i = 0; i <= options.length - 2; i++) {
    if (options[i] !== '') {
      hasDuplicates = !(options.lastIndexOf(options[i]) === i);
      if (hasDuplicates) break;
    }
  }
  return hasDuplicates ? { hasDuplicates: true } : null;
}
