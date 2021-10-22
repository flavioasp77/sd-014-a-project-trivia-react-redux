import { QUESTIONS } from '../actions/actionTypes';

const INITIAL_STATE = {
  questions: [],
};

const playReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default playReducer;
