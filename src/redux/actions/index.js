import { getToken } from '../../services/localStorage';

export const SET_GRAVATAR_EMAIL = 'REQUEST_GRAVATAR';
export const SET_USERNAME = 'SET_USERNAME';
export const REQUEST_QUESTION = 'REQUEST_QUESTION';
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
export const RECIVE_POINTS = 'RECIVE_POINTS';

export const setGravatarEmail = (payload) => ({
  type: SET_GRAVATAR_EMAIL,
  payload,
});

export const setUsername = (payload) => ({
  type: SET_USERNAME,
  payload,
});

const requestQuestion = () => ({
  type: REQUEST_QUESTION,
});

const receiveQuestion = (payload) => ({
  type: RECEIVE_QUESTION,
  payload,
});

export const fetchQuestion = () => (dispatch) => {
  dispatch(requestQuestion());
  return fetch(`https://opentdb.com/api.php?amount=5&token=${getToken()}`)
    .then((response) => response.json())
    .then((question) => dispatch(receiveQuestion(question.results)));
};

export const recivePoint = (payload) => ({
  type: RECIVE_POINTS,
  payload,
});
