import { NEXT_QUESTION, QUESTIONS, TIMER_COUNT } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: true,
  nextQuestion: 0,
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTIONS:
    return {
      ...state,
      ...action.results,
      isFetching: false,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      nextQuestion: state.nextQuestion + 1,
      isFetching: false,
    };
  case TIMER_COUNT:
    return {
      ...state,
      timer: action.payload.timer,
    };
  default:
    return state;
  }
}

export default questions;
