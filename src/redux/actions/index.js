import triviaApi from '../../services/triviaApi';

export const LOGIN = 'LOGIN';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';

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

// Assicronas:

export const triviaApiThuk = () => async (dispatch) => {
  try {
    const { token } = await triviaApi();
    dispatch(triviaApiSuccessAction(token));
  } catch (error) {
    dispatch(triviaApiErrorAction(error));
  }
};
