import { QUESTIONS, REQUEST_QUESTIONS } from '../actions/actionTypes';

const GAME_INITIALSTATE = {
  questions: [],
  isFetching: false,
};

export default function generateQuestions(state = GAME_INITIALSTATE, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case QUESTIONS:
    return { ...state, questions: action.payload, isFetching: false };
  default:
    return state;
  }
}
