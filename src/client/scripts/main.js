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

function renderPostMeta() {
  const postMetaTarget = document.getElementById('post-meta');

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

  const elems = document.getElementsByClassName("a-comment");
  let commentIds = map(elems, elem => elem.getAttribute('comment_id'));

  const initialState = {
    postComment: {
      id: postId,
      commentIds: commentIds,
      enabledSubmit: false
    }
  };

  const commentStore = configureStore(initialState);

  render(
    <Provider store={commentStore}>
      <PostCommentApp />
    </Provider>,
    document.getElementById('comment-form')
  );
}

if (postTarget) {

  // render the post meta
  renderPostMeta();

  renderPostComment();
}
