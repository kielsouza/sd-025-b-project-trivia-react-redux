export const USER_LOGIN = 'USER_LOGIN';
export const USER_SCORE = 'USER_SCORE';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const userLogin = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export const userScore = (score) => ({
  type: USER_SCORE,
  payload: score,
});

export const nextQuestion = (index) => ({
  type: NEXT_QUESTION,
  payload: index,
});
