import { TOKEN_SUCCESS, TOKEN_ERROR } from '../actions';

const INITIAL_STATE = {
  success: '',
  error: '',
};

const gamerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_SUCCESS:
    return {
      ...state,
      success: action.payload.success,
    };
  case TOKEN_ERROR:
    return {
      ...state,
      error: action.payload.error,
    };
  default:
    return state;
  }
};

export default gamerReducer;
