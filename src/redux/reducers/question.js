import { REQUEST_QUESTION, RECEIVE_QUESTION } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isLoaded: false,
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTION:
    return {
      ...state,
      isLoaded: false,
    };
  case RECEIVE_QUESTION:
    return {
      ...state,
      isLoaded: true,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default questionReducer;
