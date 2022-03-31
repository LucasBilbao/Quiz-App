import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../../../models/question.model';
import { QuizService } from '../../../services/quiz/quiz.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];

  currentQuestionIndex: number = 0;

  isLoading: boolean = true;

  isGameOver: boolean = false;

  constructor(private quizServices: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizServices.fetchQuestions().then((questions) => {
      this.questions = this.quizServices.getShuffledQuestions();
      this.isLoading = false;
    });
  }

  onNextClick(): void {
    if (this.currentQuestionIndex !== this.questions.length - 1) {
      this.currentQuestionIndex += 1;
    } else {
      this.currentQuestionIndex = 0;
      this.gameOver();
    }
  }

  getScore(): number {
    return this.quizServices.score;
  }

  gameOver(): void {
    this.isGameOver = true;
    setTimeout(() => {
      this.quizServices.score = 0;
      this.router.navigate(['/quiz']);
    }, 5000);
  }
}
