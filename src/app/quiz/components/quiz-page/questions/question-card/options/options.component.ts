import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  animate,
  transition,
  trigger,
  style,
  keyframes,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  animations: [
    trigger('shake', [
      state('shaken', style({ transform: 'translateX(0)' })),
      transition('* => shaken', [
        animate(
          '500ms',
          keyframes([
            style({ transform: 'translateX(10px)', offset: 0.2 }),
            style({ transform: 'translateX(-10px)', offset: 0.4 }),
            style({ transform: 'translateX(10px)', offset: 0.6 }),
            style({ transform: 'translateX(-10px)', offset: 0.8 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class OptionsComponent {
  @Input() options: string[] = [];
  @Input() indexChecked: number = -1;
  @Input() correctIndex: number = -1;
  @Input() isAnswerShown: boolean = false;

  @Output() optionClicked = new EventEmitter<number>();

  onOptionClick(index: number): void {
    this.indexChecked = index;
    this.optionClicked.emit(index);
  }

  isChecked(index: number): boolean {
    return this.indexChecked === index;
  }

  isCorrect(index: number): boolean {
    return this.isCorrectSelected(index) && this.isAnswerShown;
  }

  isIncorrect(index: number): boolean {
    return (
      !this.isCorrectSelected(index) &&
      this.isSelected(index) &&
      this.isAnswerShown
    );
  }

  isCorrectSelected(index: number): boolean {
    return this.correctIndex === index;
  }

  isSelected(index: number): boolean {
    return this.indexChecked === index;
  }

  show(index: number): void {
    console.log(this.isIncorrect(index));
  }
}
