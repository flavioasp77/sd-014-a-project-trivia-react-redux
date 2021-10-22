import { LOGIN, TOKEN_API, QUESTIONS } from '../actions/actionTypes';

const USER_INITIALSTATE = {
  user: {
    name: '',
    email: '',
    token: '',
    questions: [],
  },
};

export const user = (state = USER_INITIALSTATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { email: action.email, name: action.name };
  default:
    return state;
  }
};

export function requisitarToken(state = USER_INITIALSTATE, action) {
  switch (action.type) {
  case TOKEN_API:
    return { ...state, token: action.payload };
  default:
    return state;
  }
}

export const playReducer = (state = USER_INITIALSTATE, action) => {
  switch (action.type) {
  case QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};
