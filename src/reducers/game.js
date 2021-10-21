import { SET_QUESTIONS } from '../actions/indexActions';

const INITIAL_STATE = {
  questions: [],
  index: 0,
  infoIsLoaded: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTIONS:
    return {
      ...state,
      questions: action.payload.results,
      infoIsLoaded: true,
    };
  default:
    return state;
  }
};

export default game;
