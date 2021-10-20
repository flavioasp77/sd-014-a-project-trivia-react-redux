import { SET_USER_DATA } from '../actions';

const initialUserState = {
  username: '',
  email: '',
};

const user = (state = initialUserState, { type, payload }) => {
  switch (type) {
  case SET_USER_DATA:
    return { ...state, username: payload.username, email: payload.email };
  default:
    return state;
  }
};

export default user;
