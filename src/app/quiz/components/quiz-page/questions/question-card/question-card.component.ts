import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizItem } from 'src/app/quiz/models/question.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';
import { slide } from 'src/app/quiz/animations/slide.trigger';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  animations: [slide],
})
export class QuestionCardComponent {
  @Input() quizItem!: QuizItem;
  @Output() nextQuestion = new EventEmitter<void>();
  @Output() updateProgressCircle = new EventEmitter<boolean>();

  isAnythingChecked: boolean = false;

  isAnswerShown: boolean = false;

  isQuestionChanging: boolean = false;

  isCorrectChecked: boolean = false;

  constructor(private quizServices: QuizService) {}

  onNextClick(): void {
    this.isAnswerShown = true;

    this.updateProgressCircle.emit(this.isCorrectChecked);

    this.resetOptions();

    this.setQuestionChangeAnimation();

    this.updateQuestion();

    this.updateScore();
  }

  resetOptions(): void {
    setTimeout(() => {
      this.isAnswerShown = false;
      this.isAnythingChecked = false;
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

  updateIndexChecked(isAnythingChecked: boolean): void {
    this.isAnythingChecked = isAnythingChecked;
  }

  passCorrectIndex(): number {
    return this.quizItem.options.indexOf(this.quizItem.answer);
  }

  updateScore(): void {
    if (this.isCorrectChecked) this.quizServices.score += 1;
  }

  isNextButtonDisabled(): boolean {
    return !this.isAnythingChecked || this.isAnswerShown;
  }

  onUpdateIsCorrectChecked(isCorrectCheckedUpdated: boolean): void {
    this.isCorrectChecked = isCorrectCheckedUpdated;
  }
}
