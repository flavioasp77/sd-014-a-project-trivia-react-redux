import { UPDATE_PLAYER, UPDATE_RANKING, FETCH_QUESTIONS,
  CHANGE_SETTINGS } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
    pictureURL: '',
  },
  ranking: [],
  questions: [],
  settings: {
    category: '',
    difficulty: '',
    type: '',
  },
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_PLAYER:
    return { ...state, player: action.player };
  case UPDATE_RANKING:
    return { ...state, ranking: action.newRanking };
  case FETCH_QUESTIONS:
    return { ...state, questions: action.questions };
  case CHANGE_SETTINGS:
    return { ...state, settings: action.settings };
  default:
    return state;
  }
};

export default triviaReducer;
