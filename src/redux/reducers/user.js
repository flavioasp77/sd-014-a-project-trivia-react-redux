// Esse reducer será responsável por tratar as informações da pessoa usuária
const SET_TOKEN = 'SET_TOKEN';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'NEW_EMAIL':
    return {
      ...state,
      email: action.newEmail,
    };
  case SET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
}

export default user;
