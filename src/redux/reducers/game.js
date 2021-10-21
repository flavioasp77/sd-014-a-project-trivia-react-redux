import { IS_FETCHING, SET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
  isFetching: false,
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case IS_FETCHING:
    return { ...state, isFetching: !state.isFetching };
  case SET_TOKEN:
    return { ...state, token: action.token };
  default:
    return state;
  }
}
