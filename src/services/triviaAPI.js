const baseURL = 'https://opentdb.com';

const parseQuestions = (results) => results.map(({
  category,
  type,
  difficulty,
  question,
  correct_answer: correctAnswer,
  incorrect_answers: incorrectAnswers,
}) => ({
  category,
  type,
  difficulty,
  question,
  answers: [
    { text: correctAnswer, correct: true },
    ...incorrectAnswers.map((text, index) => ({ text, index, correct: false })),
  ],
}));

export const getQuestions = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${baseURL}/api.php?amount=5&token=${token}`);

  const {
    response_code: code,
    response_message: message,
    results,
  } = await response.json();

  return {
    code,
    message,
    questions: parseQuestions(results),
  };
};

export const getToken = async () => {
  const response = await fetch(`${baseURL}/api_token.php?command=request`);
  const { token } = await response.json();
  return token;
};

export default { getToken, getQuestions };
