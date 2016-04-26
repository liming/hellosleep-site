import { combineReducers } from 'redux';
import {
  RECEIVE_META,
  TOGGLE_SUBMIT
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
    const newState = Object.assign({}, state, {
      enabledSubmit: action.enabledSubmit
    });
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
