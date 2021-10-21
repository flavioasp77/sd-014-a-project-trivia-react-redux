import getToken, { getQuestions } from '../services/apiTrivia';

export const SET_USER = 'SET_USER';
export const SET_QUESTIONS = 'SET_QUESTIONS';

export const setUser = (payload) => ({ type: SET_USER, payload });
export const setQuestions = (payload) => ({ type: SET_QUESTIONS, payload });

export const setTokenAPI = () => async (dispatch) => {
  try {
    const token = await getToken();
    localStorage.setItem('token', token.token);
    const questions = await getQuestions();
    dispatch(setQuestions(questions));
  } catch (error) {
    // dispatch();
  }
};
