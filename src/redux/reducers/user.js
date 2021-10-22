import { USER } from '../actions';

const INITIAL_STATE = {
  username: '',
  assertions: '',
  score: '',
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER:
    return {
      ...state,
      username: action.payload.user,
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default user;
