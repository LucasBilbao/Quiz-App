import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
