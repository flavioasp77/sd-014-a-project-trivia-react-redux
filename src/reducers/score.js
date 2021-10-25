import { SCORE_INFO } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

function score(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SCORE_INFO:
    return {
      ...state,
      score: action.scoreNum,
    };
  default:
    return state;
  }
}

export default score;
