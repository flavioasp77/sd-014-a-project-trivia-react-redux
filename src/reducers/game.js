import { HANDLE_ANSWER,
  SET_ANSWERS,
  SET_QUESTIONS,
  SET_TIMER,
  NEXT_QUESTION } from '../actions/indexActions';

const INITIAL_STATE = {
  questions: [],
  index: 0,
  infoIsLoaded: false,
  answers: [],
  timer: {
    timerValue: 0,
    stop: false,
  },
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
    return {
      ...state,
      answers: state.answers.map((item) => {
        item.border = item.isCorrect
          ? '3px solid rgb(6, 240, 15)' : '3px solid rgb(255, 0, 0)';
        item.isDisabled = true;
        return item;
      }),
    };
  case NEXT_QUESTION:
    return {
      ...state,
      index: (state.index + 1) < state.questions.length && state.index + 1,
    };
  case SET_TIMER:
    return {
      ...state,
      timer: {
        timerValue: action.payload.timerValue,
        stop: action.payload.stop,
      },
    };
  default:
    return state;
  }
};

export default game;
