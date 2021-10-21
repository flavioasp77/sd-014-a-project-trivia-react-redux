import { QUESTIONS_CASE } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

export default function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTIONS_CASE:
    return {
      ...state,
      questions: action.payload,
    };
    default:
      return state;
  }
}
