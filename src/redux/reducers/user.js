// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_TOKEN:
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
}

export default user;
