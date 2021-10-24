import { SET_PLAYER_DATA } from '../actions';

import storage from '../../services/storage';

const initialPlayerState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialPlayerState, { type, payload }) => {
  switch (type) {
  case SET_PLAYER_DATA:
    storage.clear('state');
    storage.write('state', { player: state });
    return { ...state, ...payload };
  default:
    return state;
  }
};

export default player;
