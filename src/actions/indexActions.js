import getToken, { getCategories, getQuestions } from '../services/apiTrivia';

export const SET_USER = 'SET_USER';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_ANSWERS = 'SET_ANSWERS';
export const HANDLE_ANSWER = 'HANDLE_ANSWER';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SET_TIMER = 'SET_TIMER';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_NEW_SETTINGS = 'SET_NEW_SETTINGS';

export const setUser = (payload) => ({ type: SET_USER, payload });
export const setQuestions = (payload) => ({ type: SET_QUESTIONS, payload });
export const setAnswers = (payload) => ({ type: SET_ANSWERS, payload });
export const handleUserAnswer = (payload) => ({ type: HANDLE_ANSWER, payload });
export const nextQuestion = (payload) => ({ type: NEXT_QUESTION, payload });
export const setCategories = (payload) => ({ type: SET_CATEGORIES, payload });
export const setNewSettings = (payload) => ({ type: SET_NEW_SETTINGS, payload });

export const setTokenAPI = (param) => async (dispatch) => {
  try {
    const token = await getToken();
    localStorage.setItem('token', token.token);
    const questions = await getQuestions(param);
    dispatch(setQuestions(questions));
  } catch (error) {
    // dispatch();
  }
};

export const setCategoriesAPI = () => async (dispatch) => {
  try {
    const categories = await getCategories();
    dispatch(setCategories(categories));
  } catch (error) {
  // dispatch();
  }
};

export const setTimer = (payload) => ({
  type: SET_TIMER,
  payload,
});
