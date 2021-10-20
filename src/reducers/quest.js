import { REQUEST_TRIVIA } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TRIVIA:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default questions;
