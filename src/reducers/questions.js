import { GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

export default function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state, questions: action.payload.questions
    };
  default:
    return state;
  }
}