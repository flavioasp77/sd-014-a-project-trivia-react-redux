import { SET_PLAYER, SET_SCORE } from '../actions';
import { localSaveItem } from '../../utils/localStorageAPI';

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
    localSaveItem('state', { player: { ...state, score: action.payload } });
    return { ...state, score: action.payload };
  default:
    return state;
  }
}
