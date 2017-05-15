import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import search from './search_reducer.js';

const rootReducer = combineReducers({
  form,
  search
});

export default rootReducer;
