import { QUESTIONS_INFO } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: true,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTIONS_INFO:
    return {
      ...state,
      ...action.payload,
      isFetching: false,
    };
  default:
    return state;
  }
}

export default user;
