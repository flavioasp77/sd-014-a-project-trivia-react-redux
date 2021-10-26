import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: 'não informado',
  image: 'https://www.gravatar.com/avatar/00000000000000000000000000000000',
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload.email, name: action.payload.name };
  default:
    return state;
  }
}
