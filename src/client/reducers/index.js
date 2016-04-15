import { combineReducers } from 'redux';
import {
  RECEIVE_META
} from '../actions/post';

function post(state = {}, action) {
  switch(action.type) {

  case RECEIVE_META:
    return Object.assign({}, state, {
      meta: action.meta
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  post
});

export default rootReducer;
