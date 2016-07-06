import { combineReducers } from 'redux';

import postMeta from './post_meta';
import postComment from './post_comment';
import evaluation from './evaluation';

const rootReducer = combineReducers({
  postMeta,
  postComment,
  evaluation
});

export default rootReducer;
