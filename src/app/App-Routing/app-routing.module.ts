import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from '../quiz/components/quiz-page/questions/questions.component';
import { QuizPageComponent } from '../quiz/components/quiz-page/quiz-page.component';
import { StartQuizComponent } from '../quiz/components/quiz-page/start-quiz/start-quiz.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: StartQuizComponent },
  { path: 'sign-up', component: StartQuizComponent },
  { path: 'quiz', component: StartQuizComponent },
  { path: 'quiz/questions', component: QuestionsComponent },
  { path: 'create-question', component: StartQuizComponent },
  { path: 'history', component: StartQuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
