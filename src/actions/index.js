import fetchAPI from '../services/fetchAPI';

export const LOGIN = 'LOGIN';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_ERROR = 'TOKEN_ERROR';

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

export const fetchAPIThunk = () => async (dispatch) => {
  try {
    const { token } = await fetchAPI();
    dispatch(tokenSucessAction(token));
  } catch (error) {
    dispatch(tokenErrorAction(error));
  }
};
