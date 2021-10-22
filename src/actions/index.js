import fetchAPI from '../services/apiGame';

export const USER_LOGIN = 'USER_LOGIN';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const requestQuestions = (payload) => ({
  type: REQUEST_QUESTIONS,
  payload,
});

export const getQuestions = () => async (dispatch) => {
  const results = await fetchAPI;
  console.log(results);
  dispatch(requestQuestions(results));
};
