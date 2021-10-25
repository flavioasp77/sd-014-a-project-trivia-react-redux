import { LOGIN, GET_SCORE, GET_GRAVATAR } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  infoUser: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.payload.score,
    };
  case GET_GRAVATAR:
    return {
      ...state,
      infoUser: action.payload.infoUser,
    };
  default:
    return state;
  }
};

export default userReducer;
