import { USER, SCORE_COUNT } from '../actions';

const INITIAL_STATE = {
  username: '',
  assertions: '',
  score: 0,
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER:
    return {
      ...state,
      username: action.payload.username,
      email: action.payload.email,
    };
  case SCORE_COUNT:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
}

export default user;
