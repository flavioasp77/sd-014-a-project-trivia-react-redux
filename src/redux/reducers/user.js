import { USER_INFO } from '../actions/index';

const initialState = {
  email: '',
  name: '',
};

export default function user(
  state = initialState, { payload, type },
) {
  switch (type) {
  case USER_INFO:
    return ({
      ...state,
      email: payload.email,
      name: payload.name,
    });
  default:
    return state;
  }
}
