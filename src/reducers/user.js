import { SET_USER } from '../actions/userActions';

const INITIAL_STATE = {
  email: '',
  name: '',
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
  default:
    return state;
  }
};

export default user;
