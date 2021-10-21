import { SET_PLAYER } from '../actions';

const INICIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  token: '',
  img: '',
};

function playerReducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case SET_PLAYER:
    return { ...state, name: action.name, img: action.img };
  default:
    return state;
  }
}

export default playerReducer;
