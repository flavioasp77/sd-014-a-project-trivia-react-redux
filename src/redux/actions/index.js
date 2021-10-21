import questionApi from '../../services/questionApi';
import triviaApi from '../../services/triviaApi';

export const LOGIN = 'LOGIN';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';
export const SET_QUESTION = 'SET_QUESTION';

// Actions:
export const loginAction = ({ name, email }) => ({
  type: LOGIN,
  payload: {
    name,
    email,
  },
});

export const triviaApiSuccessAction = (success) => ({
  type: API_SUCCESS,
  payload: {
    success,
  },
});

export const triviaApiErrorAction = (error) => ({
  type: API_ERROR,
  payload: {
    error,
  },
});

export const questionAction = (questions) => ({
  type: SET_QUESTION,
  payload: {
    questions,
  },
});

// Assicronas:

export const triviaApiThuk = () => async (dispatch) => {
  try {
    const { token } = await triviaApi();
    dispatch(triviaApiSuccessAction(token));
  } catch (error) {
    dispatch(triviaApiErrorAction(error));
  }
};

export const questionApiThunk = (token) => async (dispatch) => {
  try {
    const payload = await questionApi(token);
    dispatch(questionAction(payload));
  } catch (error) {
    dispatch(triviaApiErrorAction(error));
  }
};
