import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  routing
});

export default rootReducer;
