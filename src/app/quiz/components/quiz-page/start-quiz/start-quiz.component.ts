import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss'],
})
export class StartQuizComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  startQuiz() {
    this.router.navigate(['/quiz', 'question', 1]);
    console.log('start quiz');
  }
}
