import { HANDLE_ANSWER, NEXT_QUESTION,
  SET_ANSWERS, SET_QUESTIONS } from '../actions/gameActions';

const INITIAL_STATE = {
  questions: [],
  index: 0,
  infoIsLoaded: false,
  answers: [],
  nextQuestionBtn: false,
  score: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTIONS:
    return {
      ...state,
      score: 0,
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
      score: JSON.parse(localStorage.getItem('state')).player.score,
      nextQuestionBtn: true,
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
      nextQuestionBtn: false,
      index: state.index === (state.questions.length - 1) ? 0 : (state.index + 1),
    };
  default:
    return state;
  }
};

export default game;
