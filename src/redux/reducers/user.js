import { LOGIN, TOKEN_API, QUESTIONS } from '../actions/actionTypes';

const USER_INITIALSTATE = {
  player: {
    name: '',
    email: '',
    token: '',
  },
};

const GAME_INITIALSTATE = {
  questions: [],
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

export function generateQuestions(state = GAME_INITIALSTATE, action) {
  switch (action.type) {
  case QUESTIONS:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
}
