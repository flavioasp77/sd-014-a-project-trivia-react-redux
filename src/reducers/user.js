import LOGIN from '../actions/actionTypes';

const USER_INITIALSTATE = {
  user: {
    name: '',
    email: '',
  },
};

const user = (state = USER_INITIALSTATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { email: action.email, name: action.name };
  default:
    return state;
  }
};
export default user;
