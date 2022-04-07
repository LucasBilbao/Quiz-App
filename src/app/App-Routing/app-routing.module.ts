import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionComponent } from '../quiz/components/quiz-page/create-question/create-question.component';
import { HistoryComponent } from '../quiz/components/quiz-page/history/history.component';
import { MyQuestionsComponent } from '../quiz/components/quiz-page/my-questions/my-questions.component';
import { QuestionListComponent } from '../quiz/components/quiz-page/question-list/question-list.component';
import { QuestionsComponent } from '../quiz/components/quiz-page/questions/questions.component';
import { SignInComponent } from '../quiz/components/quiz-page/sign-in/sign-in.component';
import { SignUpComponent } from '../quiz/components/quiz-page/sign-up/sign-up.component';
import { StartQuizComponent } from '../quiz/components/quiz-page/start-quiz/start-quiz.component';
import { UserService } from '../quiz/services/user/user.service';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'quiz', component: StartQuizComponent },
  { path: 'quiz/questions', component: QuestionsComponent },
  { path: 'quiz/question-list', component: QuestionListComponent },
  { path: 'create-question', component: CreateQuestionComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'my-questions', component: MyQuestionsComponent },
  { path: 'my-questions/edit/:id', component: CreateQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
