import md5 from 'crypto-js/md5';

const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
const QUESTIONS_ENDPOINT = 'https://opentdb.com/api.php?amount=5&token=';
const AVATAR_ENDPOINT = 'https://www.gravatar.com/avatar/';

const generateEndpointURL = (token, { category, difficulty, type }) => {
  const categoryString = category === 'any' ? '' : `&category=${category}`;
  const difficultyString = difficulty === 'any' ? '' : `&difficulty=${difficulty}`;
  const typeString = type === 'any' ? '' : `&type=${type}`;

  return QUESTIONS_ENDPOINT + token + categoryString + difficultyString + typeString;
};

export const getToken = async () => {
  const result = await fetch(TOKEN_ENDPOINT);
  return result.json();
};

export const getQuestions = async (token, settings) => {
  const response = await fetch(generateEndpointURL(token, settings));
  const { results } = await response.json();
  return results;
};

export const getAvatarURL = (email) => {
  const cryptoEmail = md5(email).toString();
  return AVATAR_ENDPOINT + cryptoEmail;
};
