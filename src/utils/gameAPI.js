const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
const QUESTIONS_ENDPOINT = 'https://opentdb.com/api.php?amount=5&token=';

export const getToken = async () => {
  const result = await fetch(TOKEN_ENDPOINT);
  return result.json();
};

export const getQuestions = async (token) => {
  const response = await fetch(QUESTIONS_ENDPOINT + token);
  const { results } = await response.json();
  return results;
};
