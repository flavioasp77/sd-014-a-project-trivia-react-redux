import { SET_QUESTION } from '../actions';

const INITIAL_STATE = {
  questions: {},
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTION:
    return {
      questions: action.payload.questions,
    };
  default:
    return state;
  }
};

export default questionReducer;
