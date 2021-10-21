import { fetchToken, saveTokenInLS } from '../services';

export const ADD_TOKEN = 'ADD_TOKEN';
export const HANDLE_ERROR = 'HANDLE_ERROR';

export const addTokenAction = (token) => ({
  type: ADD_TOKEN,
  payload: token,
});

export const handleErrorAction = (message) => ({
  type: HANDLE_ERROR,
  payload: message,
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
