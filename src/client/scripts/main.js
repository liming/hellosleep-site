/**
 * The file is used for post related manipulation
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';
import PostMetaApp from '../containers/PostMeta.js';
import PostCommentApp from '../containers/PostComment.js';
import { map } from 'lodash';

const postTarget = document.getElementById('post');
const postId = postTarget.getAttribute('post_id');
const user = postTarget.getAttribute('user');

function renderPostMeta() {
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

function renderPostComment() {

  const initialState = {
    postComment: {
      id: postId,
      enabledSubmit: false
    }
  };

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

  // render the post meta
  renderPostMeta();

  renderPostComment();
}
