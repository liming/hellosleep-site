// TODO:

'use strict';

const keystone = require('keystone');
const Post = keystone.list('Post');

exports = module.exports = function(req, res) {
  const view = new keystone.View(req, res);

  view.on('init', function(next) {

  });

  view.render('post');
};
