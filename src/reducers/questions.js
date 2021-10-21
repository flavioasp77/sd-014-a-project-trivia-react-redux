import { QUESTION } from '../actions/actionType';

const INITIAL_QUESTIONS = {
  questions: [],
};

function questions(state = INITIAL_QUESTIONS, action) {
  switch (action.type) {
  case QUESTION:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
}

export default questions;
