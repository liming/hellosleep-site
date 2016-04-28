import { combineReducers } from 'redux';
import {
  RECEIVE_META,
  TOGGLE_SUBMIT,
  COMMENT_INVALID,
  ADD_COMMENT,
  RECEIVE_COMMENTS
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

  let newState = Object.assign({}, state);

  // reset some state
  newState.errors = {};

  switch(action.type) {
  case RECEIVE_COMMENTS:
    return Object.assign(newState, {
      comments: action.comments
    });
  case TOGGLE_SUBMIT:
    return Object.assign(newState, {
      enabledSubmit: action.enabledSubmit
    });
  case COMMENT_INVALID:
    return Object.assign(newState, {
      errors: action.errors
    });
  case ADD_COMMENT:
    newState.comments.push(action.newComment);

    // reset the form
    newState.enabledSubmit = false;
    return newState;
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  postMeta,
  postComment
});

export default rootReducer;
