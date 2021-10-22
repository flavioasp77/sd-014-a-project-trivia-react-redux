import { GET_TIME, SET_PLAYER, SET_SCORE } from '../actions';

const INICIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  token: '',
  img: '',
  timer: 0,
};

function playerReducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case SET_PLAYER:
    return { ...state, name: action.name, img: action.img };
  case GET_TIME:
    return { ...state, timer: action.timer };
  case SET_SCORE:
    return { ...state, score: state.score + action.score };
  default:
    return state;
  }
}

export default playerReducer;
