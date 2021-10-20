import { SET_USER, SET_TOKEN } from '../actions/indexActions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: null,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
  {
    const { email, name } = action.payload;
    return {
      ...state,
      email,
      name,
    };
  }
  case SET_TOKEN:
  {
    const { token } = action.payload;
    return {
      ...state,
      token,
    };
  }
  default:
    return state;
  }
};

export default user;
