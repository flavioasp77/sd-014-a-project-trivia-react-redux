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

import {
  SAVE_USERINFO,
  FETCH_QUESTIONS,
  LOADING,
  NEXT_QUESTION,
  UPDATE_SCORE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  thumbnail: '',
  token: '',
  questions: [],
  currentQuestion: 0,
  loading: false,
};

function player(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SAVE_USERINFO:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
      thumbnail: payload.thumbnail,
      token: payload.token,
    };
  case LOADING:
    return {
      ...state,
      loading: true,
    };
  case FETCH_QUESTIONS:
    return {
      ...state,
      questions: payload,
      loading: false,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
      loading: false,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + payload,
    };
  default:
    return state;
  }
}

export default player;
