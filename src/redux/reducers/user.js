const INITIAL_STATE = {
  user: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_USER':
    return state;
  default:
    return state;
  }
};

export default userReducer;
