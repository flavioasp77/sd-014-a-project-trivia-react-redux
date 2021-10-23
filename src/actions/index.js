import fetchAPI from '../services/fetchAPI';
import questApi from '../services/questAPI';

export const LOGIN = 'LOGIN';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_ERROR = 'TOKEN_ERROR';
export const GET_QUESTION = 'GET_QUESTION';
export const GET_SCORE = 'GET_SCORE';
export const GET_GRAVATAR = 'GET_GRAVATAR';

export const login = ({ name, email }) => ({
  type: LOGIN,
  payload: {
    name,
    email,
  },
});

export const tokenSucessAction = (success) => ({
  type: TOKEN_SUCCESS,
  payload: {
    success,
  },
});

export const tokenErrorAction = (error) => ({
  type: TOKEN_SUCCESS,
  payload: {
    error,
  },
});

export const questionAction = (questions) => ({
  type: GET_QUESTION,
  payload: {
    questions,
  },
});

export const scoreAction = (score) => ({
  type: GET_SCORE,
  payload: {
    score,
  },
});

export const gravatarAction = (source) => ({
  type: GET_GRAVATAR,
  payload: {
    source,
  },
});

export const fetchAPIThunk = () => async (dispatch) => {
  try {
    const { token } = await fetchAPI();
    dispatch(tokenSucessAction(token));
  } catch (error) {
    dispatch(tokenErrorAction(error));
  }
};

export const questionApiThunk = (token) => async (dispatch) => {
  try {
    const payload = await questApi(token);
    dispatch(questionAction(payload));
  } catch (error) {
    dispatch(tokenErrorAction(error));
  }
};
