// import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_INFO':
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default user;
