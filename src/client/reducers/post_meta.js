
import {
  WAIT_META,
  RECEIVE_META
} from '../actions/post';

function postMeta(state = {invalid: false}, action) {
  switch(action.type) {

  case WAIT_META:
    return Object.assign({}, state, {
      invalid: true
    });

  case RECEIVE_META:
    return Object.assign({}, state, {
      meta: action.meta,
      invalid: false
    });
  default:
    return state;
  }
}

export default postMeta;
