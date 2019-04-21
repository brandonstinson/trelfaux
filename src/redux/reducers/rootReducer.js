import { combineReducers } from 'redux';

import authReducer from './authReducer';
import boardReducer from './boardReducer';
import currentReducer from './currentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  board: boardReducer,
  current: currentReducer,
});

export default rootReducer;
