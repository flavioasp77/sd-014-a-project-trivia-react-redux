export const getTriviaToken = async () => {
  const token = await fetch('https://opentdb.com/api_token.php?command=request');
  const dataToken = await token.json();
  const generatedToken = dataToken.token;
  return generatedToken;
};

export const getTriviaQuestions = async (token) => {
  const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const dataQuestions = await questions.json();
  return dataQuestions;
};
