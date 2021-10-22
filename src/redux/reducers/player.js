// No localStorage do navegador:

// A chave state deve conter a seguinte estrutura:
// player: {
//   name,
//   assertions,
//   score,
//   gravatarEmail
// }
// name é o nome da pessoa que joga

// assertions é o número de acertos

// score é a pontuação

// gravatarEmail é o email da pessoa que joga

// A chave ranking deve conter a seguinte estrutura:
// [
//   { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }
// ]
// A chave token deve conter o valor do token recebido na API do Trivia.

import { SAVE_USERINFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  thumbnail: '',
};

function player(state = INITIAL_STATE, { type, payload, thumbnail }) {
  switch (type) {
  case SAVE_USERINFO:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
      thumbnail,
    };
  default:
    return state;
  }
}

export default player;
