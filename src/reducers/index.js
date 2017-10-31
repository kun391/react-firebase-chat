import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import auth from './auth';
import users from './users';

const rootReducer = combineReducers({
  auth,
  users,
  routing
});

export default rootReducer;
