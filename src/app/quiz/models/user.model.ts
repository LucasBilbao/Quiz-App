import { Question } from './question.model';

export interface User {
  id: string;
  userCredentials: UserCredentials;
  scoreHistory: ScoreInfo[];
  myQuestions: string[];
}

export interface ScoreInfo {
  score: string;
  date: Date;
}

export interface UserCredentials {
  username: string;
  password: string;
}
