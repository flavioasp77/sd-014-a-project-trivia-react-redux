import { UPDATE_TIMER } from '../actions/questionTimerActions';

const INITIAL_STATE = {
  timerValue: 30,
  timerIsOn: true,
};

const questionTimer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_TIMER:
    return {
      ...state,
      timerValue: action.payload.timerValue,
      timerIsOn: action.payload.timerIsOn,
    };
  default:
    return state;
  }
};

export default questionTimer;
