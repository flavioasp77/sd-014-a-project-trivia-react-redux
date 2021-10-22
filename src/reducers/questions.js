import { QUESTIONS_INFO, SET_TIMER } from '../actions';

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
  case SET_TIMER: {
    return {
      ...state,
      timer: action.payload.timer,
    };
  }
  default:
    return state;
  }
}

export default user;
