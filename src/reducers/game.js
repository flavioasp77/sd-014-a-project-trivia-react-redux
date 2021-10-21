import { HANDLE_ANSWER, SET_ANSWERS, SET_QUESTIONS } from '../actions/indexActions';

const INITIAL_STATE = {
  questions: [],
  index: 0,
  infoIsLoaded: false,
  answers: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTIONS:
    return {
      ...state,
      questions: action.payload.results,
      infoIsLoaded: true,
    };
  case SET_ANSWERS:
    return {
      ...state,
      answers: action.payload,
    };
  case HANDLE_ANSWER:
  {
    return {
      ...state,
      answers: state.answers.map((item) => {
        item.border = item.isCorrect
          ? '3px solid rgb(6, 240, 15)' : '3px solid rgb(255, 0, 0)';
        // index === action.payload
        item.isDisabled = true;
        return item;
      }),
    };
  }
  default:
    return state;
  }
};

export default game;
