'use strict';

const keystone = require('keystone');
const PostCategory = keystone.list('PostCategory');
const PostComment = keystone.list('PostComment');
const Post = keystone.list('Post');
const moment = require('moment');
const mailer = require('../../lib/mail');

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

exports.listComments = function(req, res) {

  PostComment.model.find()
		.where('post', req.params.id)
		.where('author').ne(null)
		.populate('replyTo', 'author')
		.sort('publishedDate')
		.exec((err, comments) => {
      if (err) return res.apiError('database error', err);

      res.apiResponse({
			  data: comments.map(comment => comment.formed.data)
		  });
    });
};

exports.postComment = function(req, res) {

  const newComment = new PostComment.model(Object.assign({
    post: req.params.id
  }, req.body));

  if (req.user) {
    newComment.author = req.user.name.first;
    newComment.email = req.user.email;
  }

  newComment.save((err, result) => {
    if (err) return res.apiError('database error', err);

    // TODO: send the mail to the author of current post.
    // mailer.send({}, err => console.log(err));

    PostComment.model.findById(result._id)
      .populate('replyTo', 'author')
      .exec((err, comment) => {
        if (err) return res.apiError('database error', err);

        res.apiResponse({
			    data: comment.formed.data
		    });
      });
  });
};
