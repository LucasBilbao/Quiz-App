import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizPageComponent } from '../quiz/components/quiz-page/quiz-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: QuizPageComponent },
  { path: 'sign-up', component: QuizPageComponent },
  { path: 'quiz', component: QuizPageComponent },
  { path: 'create-question', component: QuizPageComponent },
  { path: 'history', component: QuizPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
