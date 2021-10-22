// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_TRIVIA_SUCCESS, SET_TRIVIA_ERROR } from '../actions';

const INITIAL_STATE = { questions: null };

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TRIVIA_SUCCESS:
    return ({
      ...state,
      questions: action.payload,
    });
  case SET_TRIVIA_ERROR:
    return ({
      ...state,
      error: action.payload.error,
    });
  default:
    return state;
  }
};

export default trivia;
