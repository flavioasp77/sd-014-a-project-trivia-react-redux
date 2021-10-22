import { LOGIN, QUESTIONS } from './actionTypes';

export const login = (email, name) => ({
  type: LOGIN,
  name,
  email,
});

export const generateQuestions = (questions) => ({
  type: QUESTIONS,
  payload: questions,
});

export const fetchQuestions = () => async (dispatch, getState) => {
  const { player: { token } } = getState();

  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const { results } = await response.json();

  dispatch(generateQuestions(results));
};
