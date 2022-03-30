import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

// Components
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { StartQuizComponent } from './components/quiz-page/start-quiz/start-quiz.component';
import { AuthorizationComponent } from './components/nav-bar/authorization/authorization.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ExtendableMenuComponent } from './components/nav-bar/extendable-menu/extendable-menu.component';
import { QuestionsComponent } from './components/quiz-page/questions/questions.component';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    QuizPageComponent,
    StartQuizComponent,
    AuthorizationComponent,
    NavBarComponent,
    ExtendableMenuComponent,
    QuestionsComponent,
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
  ],
  exports: [QuizPageComponent],
})
export class QuizModule {}
