export const USER_LOGIN = 'USER_LOGIN';
export const USER_SCORE = 'USER_SCORE';

export const userLogin = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export const userScore = (score) => ({
  type: USER_SCORE,
  payload: score,
});
