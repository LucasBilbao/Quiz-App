import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/quiz/models/question.model';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  @Input() question!: Question;

  indexChecked: number = -1;

  isAnswerShown: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onNextClick(): void {
    this.isAnswerShown = true;

    this.resetOptions();
  }

  resetOptions(): void {
    setTimeout(() => {
      this.isAnswerShown = false;
      this.indexChecked = -1;
    }, 2500);
  }

  updateIndexChecked(index: number): void {
    this.indexChecked = index;
  }

  passCorrectIndex(): number {
    return this.question.options.indexOf(this.question.answer);
  }
}
