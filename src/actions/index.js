import fetchAPI from '../services/fetchAPI';

export const USER_NAME = 'USER_NAME';
export const LOGIN = 'LOGIN';

export const login = (user) => ({ type: LOGIN, user });

export const username = (name) => ({ type: USER_NAME, name });

export const getQuestions = () => async (dispatch) => {
  try {
    const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
    const { token } = await fetchAPI(TOKEN_URL);

    const QUESTIONS_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const questions = await fetch(QUESTIONS_URL);

    dispatch(getQuestionsSuccess(questions));
  } catch (error) {
    dispatch(getQuestionsError(error));
  }
};
