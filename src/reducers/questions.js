import { REQUEST_QUESTIONS, UPDATE_SCORE } from '../actions';

export const INITIAL_STATE = {
  questions: [],
  loading: true,
  score: 0,
};

const questions = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      questions: payload,
      loading: false,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: payload,
    };
  default:
    return state;
  }
};

export default questions;
