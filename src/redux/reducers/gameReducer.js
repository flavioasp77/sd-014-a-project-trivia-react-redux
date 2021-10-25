import { DISABLE_BUTTON } from '../actions';

const INITIAL_STATE = {
  disableButton: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DISABLE_BUTTON:
    return {
      ...state,
      disableButton: true,
    };
  default:
    return state;
  }
};

export default game;
