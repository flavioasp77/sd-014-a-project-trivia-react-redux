import { getToken } from '../../services/requests';

export const SET_TOKEN = 'SET_TOKEN';

export function emailAction(newEmail) {
  return {
    type: 'NEW_EMAIL',
    newEmail,
  };
}

export function setTokenAction(payload) {
  return {
    type: SET_TOKEN,
    payload,
  };
}

export function setToken() {
  return async (dispatch) => {
    const token = await getToken();
    dispatch(setTokenAction(token));
    localStorage.setItem('token', token.token);
  };
}
