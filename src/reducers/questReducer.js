import { GET_QUESTION } from '../actions';

const INITIAL_STATE = {
  questions: {},
};

const questReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTION:
    return {
      questions: action.payload.questions,
    };
  default:
    return state;
  }
};

export default questReducer;
