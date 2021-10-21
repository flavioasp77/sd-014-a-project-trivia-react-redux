import { combineReducers } from 'redux';
import questionReducer from './question';

import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
  question: questionReducer,
});

export default rootReducer;
