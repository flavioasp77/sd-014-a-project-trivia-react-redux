// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_TOKEN_ERROR, SET_TOKEN_SUCCESS } from '../actions';

const INITIAL_STATE = {};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TOKEN_SUCCESS:
    return ({
      ...state,
      ...action.payload,
    });
  case SET_TOKEN_ERROR:
    return ({
      ...state,
      error: action.payload.error,
    });
  default:
    return state;
  }
};

export default token;
