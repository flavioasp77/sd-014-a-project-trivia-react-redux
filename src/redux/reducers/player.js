import { SET_PLAYER, SET_SCORE, SET_RANKING, RESET_PLAYER } from '../actions';
import { localSaveItem, updateRanking } from '../../utils/localStorageAPI';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_PLAYER:
    localSaveItem('state', { player: { ...state, ...action.payload } });
    return { ...state, ...action.payload };
  case SET_SCORE:
    localSaveItem('state', { player: { ...state,
      score: action.payload,
      assertions: state.assertions + 1 } });
    return { ...state, score: action.payload, assertions: state.assertions + 1 };
  case SET_RANKING:
    updateRanking(state);
    return state;
  case RESET_PLAYER:
    return INITIAL_STATE;
  default:
    return state;
  }
}
