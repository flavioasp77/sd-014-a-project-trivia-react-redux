import { SAVE_IMAGE } from '../actions';

const INITIAL_STATE = {
  hashImage: '',
};

function hashImage(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_IMAGE:
    return {
      hashImage: action.payload,
    };
  default:
    return state;
  }
}

export default hashImage;
