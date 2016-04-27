import { combineReducers } from 'redux';
import {
  RECEIVE_META,
  TOGGLE_SUBMIT,
  COMMENT_INVALID
} from '../actions/post';

function postMeta(state = {}, action) {
  switch(action.type) {

  case RECEIVE_META:
    return Object.assign({}, state, {
      meta: action.meta
    });
  default:
    return state;
  }
}

function postComment(state = {}, action) {
  switch(action.type) {
  case TOGGLE_SUBMIT:
    return Object.assign({}, state, {
      enabledSubmit: action.enabledSubmit
    });
  case COMMENT_INVALID:
    return Object.assign({}, state, {
      errors: action.errors
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  postMeta,
  postComment
});

export default rootReducer;
