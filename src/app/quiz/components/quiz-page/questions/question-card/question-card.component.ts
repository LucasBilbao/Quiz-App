import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/quiz/models/question.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  @Input() question!: Question;
  @Output() nextQuestion = new EventEmitter<void>();

  indexChecked: number = -1;

  isAnswerShown: boolean = false;

  isQuestionChanging: boolean = false;

  constructor(private quizServices: QuizService) {}

  ngOnInit(): void {}

  onNextClick(): void {
    this.isAnswerShown = true;

    this.resetOptions();

    this.setQuestionChangeAnimation();

    this.updateQuestion();

    this.updateScore();
  }

  resetOptions(): void {
    setTimeout(() => {
      this.isAnswerShown = false;
      this.indexChecked = -1;
    }, 4000);
  }

  setQuestionChangeAnimation(): void {
    setTimeout(() => {
      this.isQuestionChanging = true;
      setTimeout(() => {
        this.isQuestionChanging = false;
      }, 3100);
    }, 2500);
  }

  updateQuestion(): void {
    setTimeout(() => {
      this.nextQuestion.emit();
    }, 4500);
  }

  updateIndexChecked(index: number): void {
    this.indexChecked = index;
  }

  passCorrectIndex(): number {
    return this.question.options.indexOf(this.question.answer);
  }

  isCorrectChecked(): boolean {
    return (
      this.indexChecked === this.question.options.indexOf(this.question.answer)
    );
  }

  updateScore(): void {
    if (this.isCorrectChecked()) this.quizServices.score += 1;
  }

  isNextButtonDisabled(): boolean {
    return this.indexChecked === -1 || this.isAnswerShown;
  }
}
