import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUniqueID } from 'src/app/quiz/assets/getUniqueID';
import { Question } from 'src/app/quiz/models/question.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-create-question-card',
  templateUrl: './create-question-card.component.html',
  styleUrls: ['./create-question-card.component.scss'],
})
export class CreateQuestionCardComponent implements OnInit {
  question!: Question;

  questionString: string = '';

  options: string[] = ['', ''];

  correctIndex: number = -1;

  constructor(
    private quizServices: QuizService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.question = {
      id: getUniqueID(),
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

  updateCorrectAnswerIndex(index: number): void {
    this.correctIndex = index;
  }

  isItSafeToPostQuestion(): boolean {
    return (
      !this.question.options.includes('') &&
      this.question.question !== '' &&
      this.correctIndex !== -1
    );
  }

  postQuestion(): void {
    this.question.answer = this.question.options[this.correctIndex];

    if (this.isItSafeToPostQuestion()) {
      this.quizServices.postNewQuestion(this.question).subscribe();

      this.userService.putQuestion(this.question.id);

      this.router.navigate(['/quiz']);
    }
  }
}
