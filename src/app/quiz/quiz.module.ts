import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

// Components
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { StartQuizComponent } from './components/start-quiz/start-quiz.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  declarations: [
    QuizPageComponent,
    StartQuizComponent,
    AuthorizationComponent,
    NavBarComponent,
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
  ],
  exports: [QuizPageComponent],
})
export class QuizModule {}
