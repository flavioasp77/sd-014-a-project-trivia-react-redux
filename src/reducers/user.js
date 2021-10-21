import { LOGIN_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };

  default:
    return state;
  }
};

export default user;
