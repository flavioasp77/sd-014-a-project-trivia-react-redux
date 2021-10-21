import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

export default function login(state = INITIAL_STATE, action) {
  // const { type, user } = action;
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload.email, name: action.payload.name };
  default:
    return state;
  }
}
