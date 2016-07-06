import {
  TOGGLE_SUBMIT,
  COMMENT_INVALID,
  ADD_COMMENT,
  RECEIVE_COMMENTS,
  REPLY_COMMENT,
  CANCEL_REPLY
} from '../actions/post';

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
    newState.reply = undefined;
    newState.comments.push(action.newComment);

    // reset the form
    newState.enabledSubmit = false;
    return newState;
  case REPLY_COMMENT:
    const comms = state.comments.filter(comment => comment.id == action.replyId);
    if (comms.length == 0) return state;
    return Object.assign(newState, {reply: comms[0]});
  case CANCEL_REPLY:
    newState.reply = undefined;
    return newState;
  default:
    return state;
  }
}

export default postComment;
