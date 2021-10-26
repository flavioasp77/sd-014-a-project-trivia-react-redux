import {
  SAVE_USERINFO,
  FETCH_QUESTIONS,
  LOADING,
  NEXT_QUESTION,
  UPDATE_SCORE,
  RESET_SCORE,
  RESET,
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
  case RESET:
    return {
      ...state,
      currentQuestion: 0,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
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
