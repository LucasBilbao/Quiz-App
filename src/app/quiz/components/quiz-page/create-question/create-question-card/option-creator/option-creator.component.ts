import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-option-creator',
  templateUrl: './option-creator.component.html',
  styleUrls: ['./option-creator.component.scss'],
})
export class OptionCreatorComponent {
  @Input() optionInfo!: {
    index: number;
    option: string;
  };

  @Input() correctIndex: number = -1;

  @Output() deleteOption = new EventEmitter<number>();
  @Output() updateCorrectAnswerIndex = new EventEmitter<number>();
  @Output() updateOption = new EventEmitter<{
    index: number;
    option: string;
  }>();

  onDeleteOption(): void {
    this.onInput();
    this.deleteOption.emit(this.optionInfo.index);
  }

  onInput(): void {
    this.updateOption.emit(this.optionInfo);
  }

  onCheckOption(): void {
    this.updateCorrectAnswerIndex.emit(this.optionInfo.index);
  }
}
