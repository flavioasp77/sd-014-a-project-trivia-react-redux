import { SET_GRAVATAR_EMAIL, SET_USERNAME } from '../actions';

const INITIAL_STATE = {
  username: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USERNAME:
    return { ...state, username: action.payload };
  case SET_GRAVATAR_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default userReducer;
