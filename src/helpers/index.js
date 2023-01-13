const half = 0.5;
export const shuffle = (array) => array.sort(() => Math.random() - half);

export const isValidEmail = (email) => {
  const regex = /^[a-z0-9._]+@[a-z0-9_]+\.[a-z]+(\.[a-z]+)?$/i;
  return regex.test(email);
};

export const isEmptyString = (string) => string === '';

export default { shuffle, isValidEmail, isEmptyString };
