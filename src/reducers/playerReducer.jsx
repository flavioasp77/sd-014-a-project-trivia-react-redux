const INICIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function playerReducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case 1:
    return {};
  default:
    return state;
  }
}

export default playerReducer;
