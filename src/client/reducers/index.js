import { combineReducers } from 'redux';

import postMeta from './post_meta';
import postComment from './post_comment';
import evaluation from './evaluation';
import {reducer as formReducer} from 'redux-form';

const postReducers = combineReducers({
  postMeta,
  postComment
});

const evaluationReducers = combineReducers({
  evaluation,
  form: formReducer
});

export {
  postReducers,
  evaluationReducers
};
