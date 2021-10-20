import { CASO_1 } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
  ranking: [
    { name: '', score: 0, picture: '' },
  ],
};

function reduce1(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CASO_1:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default reduce1;
