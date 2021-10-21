import { QUESTIONS_INFO } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTIONS_INFO:
    return {
      ...state,
      questions: action.data,
    };
  default:
    return state;
  }
}

export default user;
