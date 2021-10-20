import { LOGIN_CASE } from '../actions';

INITIAL_STATE = {
  login: '',
  password: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_CASE:
    return {
      ...state,
      login: action.payload.login,
      password: action.payload.password,
    };
  default:
    return state;
  };
}
