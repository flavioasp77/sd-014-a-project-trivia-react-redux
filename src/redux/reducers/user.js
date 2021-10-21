import { SET_USER_DATA } from '../actions';

const initialUserState = {
  name: '',
  email: '',
};

const user = (state = initialUserState, { type, payload }) => {
  switch (type) {
  case SET_USER_DATA:
    return { ...state, ...payload };
  default:
    return state;
  }
};

export default user;
