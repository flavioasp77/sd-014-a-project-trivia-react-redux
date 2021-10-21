import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  default: {
    return state;
  }
  }
};

export default player;
