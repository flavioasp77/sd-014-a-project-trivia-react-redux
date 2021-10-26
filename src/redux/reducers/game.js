import { IS_FETCHING, SET_TOKEN, SET_QUESTIONS,
  RESET_GAME, SET_SETTINGS } from '../actions';

const INITIAL_STATE = {
  token: '',
  isFetching: false,
  questions: [],
  settings: {
    category: 'any',
    difficulty: 'any',
    type: 'any',
  },
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case IS_FETCHING:
    return { ...state, isFetching: !state.isFetching };
  case SET_TOKEN:
    return { ...state, token: action.token };
  case SET_QUESTIONS:
    return { ...state, questions: action.payload };
  case RESET_GAME:
    return INITIAL_STATE;
  case SET_SETTINGS:
    return { ...state, settings: action.settings };
  default:
    return state;
  }
}
