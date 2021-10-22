import { GET_DATA } from '../actions';

const INITIAL_STATE = {};

const data = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_DATA:
    return action.payload;
  default:
    return state;
  }
};

export default data;
