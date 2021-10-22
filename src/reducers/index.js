import { combineReducers } from 'redux';

import player from './player';
import ranking from './ranking';
import token from './token';
import trivia from './trivia';

const rootReducer = combineReducers({ player, ranking, token, trivia });

export default rootReducer;
