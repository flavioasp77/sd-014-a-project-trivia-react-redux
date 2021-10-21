import getApiToken from '../services/tokenApi';
import getApiTrivia from '../services/triviaApi';

export const SET_PLAYER_INFO = 'SET_PLAYER_INFO';
export const SET_TOKEN_ERROR = 'SET_TOKEN_ERROR';
export const SET_TOKEN_SUCCESS = 'SET_TOKEN_SUCCESS';
export const SET_TRIVIA_SUCCESS = 'SET_TRIVIA_SUCCESS';
export const SET_TRIVIA_ERROR = 'SET_TRIVIA_ERROR';

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

export const getApiTriviaSuccess = (payload) => ({
  type: SET_TRIVIA_SUCCESS,
  payload,
});

export const getApiTriviaError = (payload) => ({
  type: SET_TRIVIA_ERROR,
  payload,
});

export const getApiTriviaThunk = () => async (dispatch) => {
  try {
    const response = await getApiTrivia();
    dispatch(getApiTriviaSuccess(response.results));
  } catch (error) {
    dispatch(getApiTriviaError(error));
  }
};
