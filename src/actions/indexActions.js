import getToken from '../services/apiTrivia';

export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';

export const setUser = (payload) => ({ type: SET_USER, payload });
export const setToken = (payload) => ({ type: SET_TOKEN, payload });

export const setTokenAPI = () => async (dispatch) => {
  try {
    const token = await getToken();
    dispatch(setToken(token));
    localStorage.setItem('token', token.token);
  } catch (error) {
    // dispatch();
  }
};
