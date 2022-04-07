import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getUniqueID } from 'src/app/quiz/assets/getUniqueID';
import { Question } from 'src/app/quiz/models/question.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';
import { UserService } from 'src/app/quiz/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-question-card',
  templateUrl: './create-question-card.component.html',
  styleUrls: ['./create-question-card.component.scss'],
})
export class CreateQuestionCardComponent implements OnInit {
  question: Question = {
    id: getUniqueID(),
    question: '',
    answer: '',
    options: ['', ''],
  };

  questionString!: string;

  options!: string[];

  correctIndex: number = -1;

  isLoading: boolean = true;

  isEditing: boolean = false;

  constructor(
    private quizServices: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.quizServices
          .fetchQuestionsByIDs([params['id']])
          .subscribe((question) => {
            this.question = question[0];
            this.isEditing = true;
            this.prepareProperties();
          });
      }
      this.prepareProperties();
    });
  }

  prepareProperties(): void {
    this.questionString = this.question.question;
    this.options = new Array(...this.question.options);
    if (this.isEditing) {
      this.correctIndex = this.question.options.findIndex(
        (option) => option === this.question.answer
      );
    }

    this.isLoading = false;
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
    if (index === this.correctIndex) this.correctIndex = -1;
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

  onSubmitQuestion(): void {
    this.question.answer = this.question.options[this.correctIndex];

    if (this.isItSafeToPostQuestion()) {
      if (this.isEditing) {
        this.putQuestion();
      } else {
        this.onSubmitQuestion();
      }

      this.userService.putQuestion(this.question.id);

      this.router.navigate(['/quiz']);
    }
  }

  openSnackBar(): void {
    this._snackBar.open('Question posted successfully', '', {
      duration: 3000,
    });
  }

  putQuestion(): void {
    this.quizServices.putQuestion(this.question).subscribe(() => {
      this.openSnackBar();
    });
  }

  postQuestion(): void {
    this.quizServices.postNewQuestion(this.question).subscribe(() => {
      this.openSnackBar();
    });
  }
}
