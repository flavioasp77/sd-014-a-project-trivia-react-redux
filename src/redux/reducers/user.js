import { LOGIN, TOKEN_API, SALVAR_PONTUAÇÃO } from '../actions/actionTypes';

const USER_INITIALSTATE = {
  player: {
    // name: '',
    assertions: 0,
    gravatarEmail: '',
    score: 0,
    token: '',
  },
};

export const user = (state = USER_INITIALSTATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { gravatarEmail: action.email, name: action.name };
  default:
    return state;
  }
};

export const requisitarToken = (state = USER_INITIALSTATE, action) => {
  switch (action.type) {
  case TOKEN_API:
    return { ...state, token: action.payload };
  default:
    return state;
  }
};

export const updateScore = (state = USER_INITIALSTATE, action) => {
  switch (action.type) {
  case SALVAR_PONTUAÇÃO:
    return { ...state,
      player: { ...state.player,
        score: action.score,
        assertions: action.assertions } };
  default:
    return state;
  }
};
