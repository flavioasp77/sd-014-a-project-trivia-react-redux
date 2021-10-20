import { LOGIN_CASE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_CASE:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return state;
  };
}
