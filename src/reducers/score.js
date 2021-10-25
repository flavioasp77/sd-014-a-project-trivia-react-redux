import { GET_SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

export default function score(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_SCORE:
    return {
      ...state, score: action.payload.score,
    };
  default:
    return state;
  }
}
