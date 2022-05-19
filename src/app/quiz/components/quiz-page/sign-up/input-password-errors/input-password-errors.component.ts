import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-password-errors',
  templateUrl: './input-password-errors.component.html',
})
export class InputPasswordErrorsComponent {
  @Input() errors: any;
}
