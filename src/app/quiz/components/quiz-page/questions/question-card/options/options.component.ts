import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() indexChecked: number = -1;
  @Input() correctIndex: number = -1;
  @Input() isAnswerShown: boolean = false;

  @Output() optionClicked = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

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
}
