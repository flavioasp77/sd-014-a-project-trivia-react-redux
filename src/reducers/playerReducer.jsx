import { GET_TIME, SET_PLAYER, SET_SCORE, REST_TIMER } from '../actions';

const INICIAL_STATE = {
  setTime: '',
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
  case REST_TIMER:
    return { ...state, setTime: action.setTime };
  default:
    return state;
  }
}

export default playerReducer;
