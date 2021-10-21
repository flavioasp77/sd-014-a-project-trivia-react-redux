import { SET_PLAYER } from '../actions';
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
    localSaveItem('state', { ...state, ...action.payload });
    return { ...state, ...action.payload };
  default:
    return state;
  }
}
