import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
<<<<<<< HEAD
  case ADD_USER:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
      gravatarEmail: `https://www.gravatar.com/avatar/${action.generateHash}` };
  case null:
    return state;
=======
>>>>>>> 681274a0d722bb5622c00bd3799ea46036380bff
  default:
    return state;
  }
};

export default player;
