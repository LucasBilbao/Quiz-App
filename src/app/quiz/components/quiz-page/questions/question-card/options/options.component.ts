import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { shake } from 'src/app/quiz/animations/shake.trigger';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  animations: [shake],
})
export class OptionsComponent implements OnChanges {
  @Input() options: string[] = [];
  @Input() answer: string = '';
  @Input() isAnswerShown: boolean = false;

  @Output() optionClicked = new EventEmitter<boolean>();
  @Output() updateIsCorrectChecked = new EventEmitter<boolean>();

  indexChecked: number = -1;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['answer']?.currentValue) {
      this.indexChecked = -1;
      this.options = [...this.options, this.answer].sort(
        () => 0.5 - Math.random()
      );
    }
  }

  onOptionClick(index: number): void {
    this.indexChecked = index;
    this.optionClicked.emit(true);

    this.updateIsCorrectChecked.emit(this.isCorrectSelected(index));
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
    return this.options[index] === this.answer;
  }

  isSelected(index: number): boolean {
    return this.indexChecked === index;
  }
}
