import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/quiz/models/question.model';
import { User } from 'src/app/quiz/models/user.model';
import { QuizService } from 'src/app/quiz/services/quiz/quiz.service';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss'],
})
export class MyQuestionsComponent implements OnInit {
  myQuestionIDs!: string[];

  questions!: Question[];

  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    if (!this.userService.user) {
      this.userService.fetchUserByID().then((user) => {
        this.myQuestionIDs = user.myQuestions;
        this.fetchQuestions();
      });
    } else {
      this.myQuestionIDs = this.userService.user.myQuestions;
      this.fetchQuestions();
    }
  }

  fetchQuestions(): void {
    this.quizService
      .fetchQuestionsByIDs(this.myQuestionIDs)
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        this.isLoading = false;
      });
  }

  onDeleteQuestion(question: Question): void {
    const index: number = this.questions.findIndex((q) => q.id === question.id);

    this.questions.splice(index, 1);

    this.quizService.deleteQuestion(question.id);
    this.userService.deleteQuestionID(question.id);
  }
}
