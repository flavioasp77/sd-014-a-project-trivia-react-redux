const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  garvatarEmail: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_EMAIL':
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  default:
    return state;
  }
}

export default user;
