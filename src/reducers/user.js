import { LOGIN } from '../actions/actionType';

const INITIAL_STATE = {
  name: '',
  email: '',
  totalScore: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, name: action.payload.name, email: action.payload.email };
  default:
    return state;
  }
};

export default user;
