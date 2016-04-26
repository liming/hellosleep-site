/**
 * The common utilities for the views
 */

'use strict';

const keystone = require('keystone');
const PostComment = keystone.list('PostComment');

exports.listComments = function(postId, cb) {
  if (!postId) return cb();

  PostComment.model.find()
		.where('post', postId)
		.where('author').ne(null)
		.populate('replyTo', 'author')
		.sort('publishedDate')
		.exec(cb);
};
