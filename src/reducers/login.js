import { LOGIN } from '../actions';

const INITIAL_STATE = {
  user: '',
};

export default function login(state = INITIAL_STATE, { type, user }) {
  switch (type) {
  case LOGIN:
    return user;
  default:
    return state;
  }
}
