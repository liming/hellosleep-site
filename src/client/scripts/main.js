/**
 * The file is used for post related manipulation
 */

var React = require('react');
var ReactDOM = require('react-dom');

var PostToolsApp = require('../containers/PostTools.js');
var postToolsTarget = document.getElementById('post-tools');

if (postToolsTarget) {
  ReactDOM.render(<PostToolsApp />, postToolsTarget);
}
