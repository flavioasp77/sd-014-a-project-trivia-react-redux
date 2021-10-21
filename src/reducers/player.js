import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
      gravatarEmail: `https://www.gravatar.com/avatar/${action.generateHash}` };
  case null:
    return state;
  default:
    return state;
  }
};

export default player;
