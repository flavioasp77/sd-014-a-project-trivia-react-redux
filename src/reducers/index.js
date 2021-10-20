import { combineReducers } from 'redux';
import trivia from './indexRedux';

const rootReducer = combineReducers({
  trivia,
});

export default rootReducer;
