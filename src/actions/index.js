import fetchAPI from '../services/apiGame';

export const USER_LOGIN = 'USER_LOGIN';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';

export const UPDATE_SCORE = 'UPDATE_SCORE';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const requestQuestions = (payload) => ({
  type: REQUEST_QUESTIONS,
  payload,
});

export const getQuestions = () => (dispatch) => {
  fetchAPI().then((results) => dispatch(requestQuestions(results)));
};

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});
