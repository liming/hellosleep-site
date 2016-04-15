'use strict';

const keystone = require('keystone');
const PostCategory = keystone.list('PostCategory');
const Post = keystone.list('Post');

exports.listCategories = function(req, res) {
  PostCategory.model.find().sort('name').exec((err, results) => {
    if (err) return res.apiError('database error', err);

    res.apiResponse({
			data: results
		});
  });
};

exports.getPost = function(req, res) {
  Post.model.findOne({id: req.params.id}).exec((err, result) => {
    if (err) return res.apiError('database error', err);

    res.apiResponse({
			data: result
		});
  });
};

exports.likePost = function(req, res) {

  let count = 1;
  if (req.query.method == 'delete') count = -1;

  Post.model.findById(req.params.id).exec((err, post) => {
    if (err) return res.apiError('database error', err);

    post.likes += (req.query.method == 'delete' ? -1 : 1);
    post.save((err) => {
      if (err) return res.apiError('database error', err);

      res.apiResponse({
			  data: post.likes
		  });
    });
  });
};
