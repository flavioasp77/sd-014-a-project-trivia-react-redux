import { IS_FETCHING, SET_TOKEN, SET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  token: '',
  isFetching: false,
  questions: [],
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case IS_FETCHING:
    return { ...state, isFetching: !state.isFetching };
  case SET_TOKEN:
    return { ...state, token: action.token };
  case SET_QUESTIONS:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
}
