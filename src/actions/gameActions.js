import getToken, { getQuestions } from '../services/apiTrivia';

export const HANDLE_ANSWER = 'HANDLE_ANSWER';
export const SET_ANSWERS = 'SET_ANSWERS';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const setAnswers = (payload) => ({ type: SET_ANSWERS, payload });
export const setQuestions = (payload) => ({ type: SET_QUESTIONS, payload });
export const handleUserAnswer = (payload) => ({ type: HANDLE_ANSWER, payload });
export const nextQuestion = (payload) => ({ type: NEXT_QUESTION, payload });

export const setTokenAPI = (param) => async (dispatch) => {
  const token = await getToken();
  localStorage.setItem('token', token.token);
  const questions = await getQuestions(param);
  dispatch(setQuestions(questions));
};
