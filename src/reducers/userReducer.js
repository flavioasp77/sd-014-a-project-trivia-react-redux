// import { HANDLE_ERROR } from '../actions';
import { GET_PLAYER, GET_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case GET_PLAYER:
    return {
      ...state,
      score: action.payload.player.score,
    };
  default:
    return state;
  }
};

export default userReducer;
