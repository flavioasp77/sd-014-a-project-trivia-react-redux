import getApiToken from '../services/tokenApi';

export const SET_PLAYER_INFO = 'SET_PLAYER_INFO';
export const SET_TOKEN_ERROR = 'SET_TOKEN_ERROR';
export const SET_TOKEN_SUCCESS = 'SET_TOKEN_SUCCESS';

export const setPlayerInfo = (payload) => ({
  type: SET_PLAYER_INFO,
  payload,
});

export const getApiSuccess = (payload) => ({
  type: SET_TOKEN_SUCCESS,
  payload,
});

export const getApiError = (payload) => ({
  type: SET_TOKEN_ERROR,
  payload,
});

export const getApiTokenThunk = () => async (dispatch) => {
  try {
    const response = await getApiToken();
    dispatch(getApiSuccess(response));
  } catch (error) {
    dispatch(getApiError(error));
  }
};
