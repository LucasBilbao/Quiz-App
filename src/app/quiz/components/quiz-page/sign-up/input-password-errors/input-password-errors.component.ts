import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-password-errors',
  templateUrl: './input-password-errors.component.html',
  styleUrls: ['./input-password-errors.component.scss'],
})
export class InputPasswordErrorsComponent {
  @Input() errors: any;
}
