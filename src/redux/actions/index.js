import { getToken } from '../../utils/gameAPI';
import { localSaveItem } from '../../utils/localStorageAPI';

export const SET_PLAYER = 'LOGIN_PLAYER';
export const IS_FETCHING = 'IS_FETCHING';
export const SET_TOKEN = 'GET_TOKEN';

const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

const setPlayer = (payload) => ({
  type: SET_PLAYER,
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
