/**
 * The file is used for post related manipulation
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';
import PostMetaApp from '../containers/PostMeta.js';

const postMetaTarget = document.getElementById('post-meta');

if (postMetaTarget) {

  const initialState = {
    post: {
      id: postMetaTarget.getAttribute('post_id'),
      meta: {likes: postMetaTarget.getAttribute('post_likes')}
    }
  };

  const store = configureStore(initialState);

  render(
    <Provider store={store}>
      <PostMetaApp />
    </Provider>,
    postMetaTarget
  );
}
