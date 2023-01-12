const getQuestions = async () => {
  const localToken = localStorage.getItem('token');
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`);
  const requestJson = await request.json();
  return requestJson;
};

export default getQuestions;
