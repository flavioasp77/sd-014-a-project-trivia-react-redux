import { ADD_TOKEN, HANDLE_ERROR, ADD_TRIVIA } from '../actions';

const INITIAL_STATE = {
  questions: [],
  token: '',
  error: false,
  message: '',
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return {
      ...state, token: action.payload, error: false, message: '',
    };
  case HANDLE_ERROR:
    return {
      ...state, error: true, message: action.payload,
    };
  case ADD_TRIVIA:
    return {
      ...state, questions: action.payload,
    };
  default:
    return state;
  }
};

export default triviaReducer;
