import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getUniqueID } from 'src/app/quiz/assets/getUniqueID';
import { Question } from 'src/app/quiz/models/question.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';
import { UserService } from 'src/app/quiz/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { duplicateOptions } from 'src/app/quiz/assets/validators/duplicate-options.validator';

@Component({
  selector: 'app-create-question-card',
  templateUrl: './create-question-card.component.html',
  styleUrls: ['./create-question-card.component.scss'],
})
export class CreateQuestionCardComponent implements OnInit {
  questionForm!: FormGroup;

  isLoading: boolean = true;

  isEditing: boolean = false;

  answerIndex: number = -1;

  constructor(
    private quizServices: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.quizServices
          .fetchQuestionsByIDs([params['id']])
          .subscribe((questions) => {
            this.prepareQuestionForm(questions[0]);
            this.isEditing = true;
          });
      }
      this.prepareQuestionForm({
        id: getUniqueID(),
        question: '',
        answer: '',
        options: ['', ''],
      });
    });
  }

  prepareQuestionForm(question: Question): void {
    this.questionForm = this.fb.group({
      id: [question.id, Validators.required],
      question: [question.question, Validators.required],
      answer: [question.answer, Validators.required],
      options: this.fb.array([], [duplicateOptions]),
    });

    question.options.forEach((option, index) => {
      this.addOption(option);
      if (option === question.answer && option !== '') {
        this.answerIndex = index;
      }
    });
    this.isLoading = false;
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  addOption(option: string): void {
    this.options.push(this.createOption(option));
  }

  createOption(option: string): FormControl {
    return new FormControl(option, [Validators.required]);
  }

  onSubmitQuestion(): void {
    this.updateAnswerIndex(this.answerIndex);

    if (this.isEditing) {
      this.putQuestion();
    } else {
      this.postQuestion();
    }

    this.userService.putQuestion(this.questionForm.get('id')?.value);

    this.router.navigate(['/quiz']);
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }

  removeOptionOn(index: number): void {
    this.options.removeAt(index);
    if (index === this.answerIndex) this.answerIndex--;
  }

  updateAnswerIndex(index: number): void {
    this.answerIndex = index;
    this.questionForm.patchValue({ answer: this.options.at(index).value });
  }

  putQuestion(): void {
    this.quizServices.putQuestion(this.createQuestion()).subscribe(() => {
      this.openSnackBar('Question posted successfully');
    });
  }

  postQuestion(): void {
    this.quizServices.postNewQuestion(this.createQuestion()).subscribe(() => {
      this.openSnackBar('Question posted successfully');
    });
  }

  createQuestion(): Question {
    return {
      id: this.questionForm.get('id')?.value,
      question: this.questionForm.get('question')?.value,
      answer: this.questionForm.get('answer')?.value,
      options: this.options.value,
    };
  }

  onDeleteQuestion(id: string): void {
    this.quizService.deleteQuestion(id);
    this.userService.deleteQuestionID(id);

    this.openSnackBar('Question deleted');

    this.router.navigate(['/my-questions']);
  }
}
