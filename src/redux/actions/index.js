import { getToken, getQuestions } from '../../utils/gameAPI';
import { localSaveItem, localGetItem } from '../../utils/localStorageAPI';

export const SET_PLAYER = 'LOGIN_PLAYER';
export const IS_FETCHING = 'IS_FETCHING';
export const SET_TOKEN = 'GET_TOKEN';
export const SET_QUESTIONS = 'GET_QUESTIONS';
export const SET_SCORE = 'SET_SCORE';

export const RESET_PLAYER = 'RESET_PLAYER';
export const RESET_GAME = 'RESET_GAME';
export const SET_RANKING = 'SET_RANKING';

export const setRanking = () => ({ type: SET_RANKING });

const resetGame = () => ({ type: RESET_GAME });
const resetPlayer = () => ({ type: RESET_PLAYER });

export const resetAll = () => (dispatch) => {
  dispatch(resetGame());
  dispatch(resetPlayer());
};

const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

const setPlayer = (payload) => ({
  type: SET_PLAYER,
  payload,
});

const setQuestions = (payload) => ({
  type: SET_QUESTIONS,
  payload,
});

export const setScore = (payload) => ({
  type: SET_SCORE,
  payload,
});

const isFetching = () => ({ type: IS_FETCHING });

const fetchToken = () => (
  async (dispatch) => {
    dispatch(isFetching());
    const { token } = await getToken();
    localSaveItem('token', token);
    dispatch(setToken(token));
    dispatch(isFetching());
  }
);

export const loginPlayer = (player) => (
  (dispatch) => {
    dispatch(setPlayer(player));
    dispatch(fetchToken());
  }
);

export const fetchQuestions = () => (
  async (dispatch) => {
    const token = localGetItem('token');
    const questions = await getQuestions(token);
    dispatch(setQuestions(questions));
  }
);
