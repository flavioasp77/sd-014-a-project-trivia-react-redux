import { TIMER_ACTION } from '../actions';

const INITIAL_STATE = {
  time: 30,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER_ACTION:
    return {
      time: action.timer,
    };
  default:
    return state;
  }
};

export default timer;
