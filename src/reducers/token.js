import { GET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

export default function tokenReducer(state = INITIAL_STATE, { type, token }) {
  switch (type) {
  case GET_TOKEN:
    return token;
  default:
    return state;
  }
}
