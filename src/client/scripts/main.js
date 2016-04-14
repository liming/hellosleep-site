/**
 * The file is used for post related manipulation
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';
import PostMetaApp from '../containers/PostMeta.js';

const postMetaTarget = document.getElementById('post-meta');

const store = configureStore();

if (postMetaTarget) {
  render(
    <Provider store={store}>
      <PostMetaApp
        postId={postMetaTarget.getAttribute('post_id')}
        likes={postMetaTarget.getAttribute('post_likes')} />
    </Provider>,
    postMetaTarget
  );
}
