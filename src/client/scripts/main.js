/**
 * The file is used for post related manipulation
 */

import React from 'react';
import ReactDOM from 'react-dom';

import PostToolsApp from '../containers/PostTools.js';
const postToolsTarget = document.getElementById('post-tools');

if (postToolsTarget) {
  ReactDOM.render(<PostToolsApp />, postToolsTarget);
}
