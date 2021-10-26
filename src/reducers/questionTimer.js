import { UPDATE_TIMER } from '../actions/questionTimerActions';

const INITIAL_STATE = {
  timerValue: 30,
};

const questionTimer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_TIMER:
    return {
      ...state,
      timerValue: action.payload.timerValue,
    };
  default:
    return state;
  }
};

export default questionTimer;
