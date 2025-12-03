export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  subject: string;
  explanation: string;
}

export enum GameState {
  START = 'START',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER'
}

export type FeedbackType = 'correct' | 'incorrect' | null;