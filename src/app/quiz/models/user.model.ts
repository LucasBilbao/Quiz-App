import { QuizItem } from './question.model';

export interface User {
  id: string;
  credentials: Credentials;
  scoreHistory: ScoreInfo[];
  questions: string[];
}

export interface ScoreInfo {
  score: number;
  maxScore: number;
  date: Date;
}

export interface Credentials {
  username: string;
  password: string;
}
