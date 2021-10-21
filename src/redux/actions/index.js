import { getToken } from '../../services/requests';

export const SET_TOKEN = 'SET_TOKEN';

export function emailAction(newEmail) {
  return {
    type: 'NEW_EMAIL',
    newEmail,
  };
}

export function setTokenAction(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export function setToken() {
  return async (dispatch) => {
    const data = await getToken();
    dispatch(setTokenAction(data));
  };
}
