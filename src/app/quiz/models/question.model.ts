export interface QuizItem {
  id: string;
  question: string;
  answer: string;
  options: string[];
}

export const defaultQuizItem = {
  id: '',
  question: '',
  answer: '',
  options: ['', ''],
};
