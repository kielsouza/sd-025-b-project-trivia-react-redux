export const USER_LOGIN = 'USER_LOGIN';
export const USER_SCORE = 'USER_SCORE';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const USER_ASSERTIONS = 'USER_ASSERTIONS';
export const RESET_INDEX = 'RESET_INDEX';
export const RESET_SCORE = 'RESET_SCORE';

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

export const userAssertions = (count) => ({
  type: USER_ASSERTIONS,
  payload: count,
});

export const resetIndex = (index) => ({
  type: RESET_INDEX,
  payload: index,
});

export const resetScore = (score) => ({
  type: RESET_SCORE,
  payload: score,
});
