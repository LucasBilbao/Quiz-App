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

  constructor() {}

  ngOnInit(): void {}

  onNextClick(): void {
    this.indexChecked = -1;
  }
}
