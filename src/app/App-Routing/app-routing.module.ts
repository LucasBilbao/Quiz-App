import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizPageComponent } from '../quiz/components/quiz-page/quiz-page.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
