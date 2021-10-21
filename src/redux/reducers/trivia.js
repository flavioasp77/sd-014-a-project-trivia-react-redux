import { SAVE_SCORE } from '../actions';

const SCORE_INITIAL_STATE = ({
  score: 0,
});

function trivia(state = SCORE_INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SAVE_SCORE:
    return { ...state, score: payload };
  default: return state;
  }
}

export default trivia;
