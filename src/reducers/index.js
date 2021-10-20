import { combineReducers } from 'redux';

import player from './player';
import ranking from './ranking';

const rootReducer = combineReducers({ player, ranking });

export default rootReducer;
