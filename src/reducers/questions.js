import { REQUEST_QUESTIONS } from '../actions';

export const INITIAL_STATE = {
  questions: [],
};

const questions = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      questions: [...payload],
    };
  default:
    return state;
  }
};

export default questions;
