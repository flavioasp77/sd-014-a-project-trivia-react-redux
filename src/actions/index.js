import fetchAPI from '../services/fetchAPI';

export const USER_NAME = 'USER_NAME';
export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_GRAVATAR = 'GET_GRAVATAR';
export const GET_SCORE = 'GET_SCORE';

export const login = (email, name) => ({
  type: LOGIN,
  payload: { email, name },
});

const getToken = (token) => ({
  type: GET_TOKEN,
  payload: { token },
});

const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  payload: { questions },
});

export const getGravatar = (image) => ({
  type: GET_GRAVATAR,
  payload: image,
});

export const getScore = (score) => ({
  type: GET_SCORE,
  payload: {
    score,
  },
});

export const getTokenThunk = () => async (dispatch) => {
  const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
  const { token } = await fetchAPI(TOKEN_URL);

  localStorage.setItem('token', token);

  dispatch(getToken(token));
};

export const getQuestionsThunk = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const QUESTIONS_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetchAPI(QUESTIONS_URL);
  const questions = response.results;
  dispatch(getQuestions(questions));
};
