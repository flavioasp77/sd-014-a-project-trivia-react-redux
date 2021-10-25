import { fetchToken, saveTokenInLS, fetchTrivia } from '../services';

export const ADD_TOKEN = 'ADD_TOKEN';
export const HANDLE_ERROR = 'HANDLE_ERROR';
export const ADD_TRIVIA = 'ADD_TRIVIA';
export const GET_USER = 'GET_USER';
export const GET_PLAYER = 'GET_PLAYER';

export const getUserAction = (payload) => ({
  type: GET_USER,
  payload,
});

export const addTokenAction = (token) => ({
  type: ADD_TOKEN,
  payload: token,
});

export const handleErrorAction = (message) => ({
  type: HANDLE_ERROR,
  payload: message,
});

export const addTrivia = (data) => ({
  type: ADD_TRIVIA,
  payload: data,
});

export const registerPlayer = (player) => ({
  type: GET_PLAYER,
  payload: player,
});

export const getTokenActionThunk = () => async (dispatch) => {
  try {
    const token = await fetchToken();
    saveTokenInLS(token);
    dispatch(addTokenAction(token));
  } catch (message) {
    dispatch(handleErrorAction(message));
  }
};

export const getTriviaActionThunk = (token) => (dispatch) => {
  fetchTrivia(token)
    .then(({ results, response_code: code }) => {
      if (code === 0) {
        dispatch(addTrivia(results));
      } else {
        dispatch(handleErrorAction('Token expirado, refaça seu login'));
      }
    })
    .catch((error) => dispatch(handleErrorAction(error.message)));
};
