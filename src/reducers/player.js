// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_PLAYER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER_INFO:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default player;
