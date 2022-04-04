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

  options: string[] = ['', ''];

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
    this.options.push('');
  }

  onUpdateOption(optionInfo: any): void {
    this.question.options[optionInfo.index] = optionInfo.option;
  }

  clearOption(index: number): void {
    this.options[index] = '';
    this.onUpdateOption({ index, option: '' });
  }

  onDeleteOption(index: number): void {
    this.question.options.splice(index, 1);
    this.options = this.question.options;
  }

  updateCorrectAnswer(index: number): void {
    this.question.answer = this.question.options[index];
  }

  postQuestion(): void {
    this.quizServices.postNewQuestion(this.question).subscribe();

    this.router.navigate(['/quiz']);
  }
}
