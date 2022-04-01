import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/quiz/models/question.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';

@Component({
  selector: 'app-create-question-card',
  templateUrl: './create-question-card.component.html',
  styleUrls: ['./create-question-card.component.scss'],
})
export class CreateQuestionCardComponent implements OnInit {
  question!: Question;

  questionString: string = '';

  options: any = {
    0: '',
    1: '',
  };

  constructor(private quizServices: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.question = {
      id: this.quizServices.getUniqueID(),
      question: '',
      answer: '',
      options: ['', ''],
    };
  }

  addOption(): void {
    this.question.options.push('');
    this.options[this.question.options.length - 1] = '';
  }

  updateOptions(index: number): void {
    this.question.options[index] = this.options[index];
  }

  clearOption(index: number): void {
    this.options[index] = '';
    this.updateOptions(index);
  }

  deleteOption(index: number): void {
    this.updateOptionsObjectFrom(index);
    this.question.options.splice(index, 1);
  }

  updateOptionsObjectFrom(index: number): void {
    for (let i = index; i < this.question.options.length; i++) {
      this.options[i] = this.options[i + 1];
    }
    delete this.options[this.question.options.length - 1];
  }

  updateCorrectAnswer(index: number): void {
    this.question.answer = this.question.options[index];
  }

  postQuestion(): void {
    this.quizServices.postNewQuestion(this.question).subscribe();

    this.router.navigate(['/quiz']);
  }
}
