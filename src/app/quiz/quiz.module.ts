import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { StartQuizComponent } from './components/quiz-page/start-quiz/start-quiz.component';
import { AuthorizationComponent } from './components/nav-bar/authorization/authorization.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ExtendableMenuComponent } from './components/nav-bar/extendable-menu/extendable-menu.component';
import { QuestionsComponent } from './components/quiz-page/questions/questions.component';
import { QuestionCardComponent } from './components/quiz-page/questions/question-card/question-card.component';
import { OptionsComponent } from './components/quiz-page/questions/question-card/options/options.component';
import { CreateQuestionComponent } from './components/quiz-page/create-question/create-question.component';
import { CreateQuestionCardComponent } from './components/quiz-page/create-question/create-question-card/create-question-card.component';
import { SignUpComponent } from './components/quiz-page/sign-up/sign-up.component';
import { OptionCreatorComponent } from './components/quiz-page/create-question/create-question-card/option-creator/option-creator.component';
import { HistoryComponent } from './components/quiz-page/history/history.component';
import { SignInComponent } from './components/quiz-page/sign-in/sign-in.component';
import { MyQuestionsComponent } from './components/quiz-page/my-questions/my-questions.component';
import { QuestionListComponent } from './components/quiz-page/question-list/question-list.component';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// My Modules
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { InputPasswordErrorsComponent } from './components/quiz-page/sign-up/input-password-errors/input-password-errors.component';

@NgModule({
  declarations: [
    QuizPageComponent,
    StartQuizComponent,
    AuthorizationComponent,
    NavBarComponent,
    ExtendableMenuComponent,
    QuestionsComponent,
    QuestionCardComponent,
    OptionsComponent,
    CreateQuestionComponent,
    CreateQuestionCardComponent,
    SignUpComponent,
    OptionCreatorComponent,
    HistoryComponent,
    SignInComponent,
    MyQuestionsComponent,
    QuestionListComponent,
    InputPasswordErrorsComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    SharedModule,
    MatSnackBarModule,
  ],
  exports: [QuizPageComponent],
})
export class QuizModule {}
