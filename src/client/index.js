/**
 * The file is used for post related manipulation
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {configureStore, configureEvaluationStore} from './stores/configureStore';
import PostMetaApp from './containers/PostMeta.js';
import PostCommentApp from './containers/PostComment';
import EvaluationApp from './containers/Evaluation';

const postTarget = document.getElementById('post');

function renderPostMeta(postId) {
  const postMetaTarget = document.getElementById('post-tools');

  const initialState = {
    postMeta: {
      id: postId,
      meta: {likes: postMetaTarget.getAttribute('post_likes')}
    }
  };

  const metaStore = configureStore(initialState);

  render(
    <Provider store={metaStore}>
      <PostMetaApp />
    </Provider>,
    postMetaTarget
  );
}

function renderPostComment(postId) {

  const initialState = {
    postComment: {
      id: postId,
      enabledSubmit: false
    }
  };

  const user = postTarget.getAttribute('user');
  const commentStore = configureStore(initialState);

  render(
    <Provider store={commentStore}>
      <PostCommentApp
        user={user}
      />
    </Provider>,
    document.getElementById('post-comment')
  );
}

if (postTarget) {
  const postId = postTarget.getAttribute('post_id');

  // render the post meta
  renderPostMeta(postId);

  renderPostComment(postId);
}

// create evaluation page
const evaluationTarget = document.getElementById('new_evaluation');

function renderEvaluation() {

  const initialState = {};

  const evaluationStore = configureEvaluationStore(initialState);
  const content = require('../data/evaluation.json');

  render(
    <Provider store={evaluationStore}>
      <EvaluationApp
        content={content}
      />
    </Provider>,
    evaluationTarget
  );
}

if (evaluationTarget) {
  renderEvaluation();
}
