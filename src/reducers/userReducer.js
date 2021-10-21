// import { HANDLE_ERROR } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  hash: '',
  error: false,
  message: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default userReducer;
