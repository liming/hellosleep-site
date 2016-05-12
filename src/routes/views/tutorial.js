
'use strict';

const keystone = require('keystone');
const PostCategory = keystone.list('PostCategory');
const Post = keystone.list('Post');

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;
  const postKey = req.params.post;
  const catKey = req.params.category;
  locals.section = 'tutorial';
  let indices = [];

  let type;

  // load the indices
  // The tutorial indices contain 2 parts:
  // 1. the tutorial posts without categories
  // 2. the categories contain tutorial posts.

  // load posts in indices
  view.on('init', function(next) {

    Post.model.find({type: 'tutorial'}, {'title': 1, 'key': 1})
      .where('categories', {$size: 0})
      .sort('weight')
      .exec((err, results) => {
        if (err) return next(err);

        indices = indices.concat(results);
        return next();
      });
  });

  // load categories in indices
  view.on('init', function(next) {
    PostCategory.model.find({}, {'name': 1, 'key': 1, 'tutorialCount': 1})
      .where('tutorialCount', {$gt: 0})
      .sort('weight')
      .exec((err, results) => {
        if (err) return next(err);

        indices = indices.concat(results);
        locals.indices = indices;

        return next();
      });
  });

  // check if this is post
  // this is for the page will display a post
  view.on('init', function (next) {
    if (!postKey) return next();

    Post.model.findOne({
		  state: 'published',
		  key: postKey
	  }).populate('author categories')
      .exec((err, result) => {
        if (err) return next(err);
        if (!result) return next();

        locals.post = result;

        // current post's category. some post don't have category
        if (result.categories.length > 0) {
          locals.category = result.categories[0];
        }

        next();
      });
  });

  // check the category of current post
  view.on('init', function(next) {
    if (!locals.post || !locals.category) return next();

    // load the posts based on a category
    Post.model.find({}, {'title': 1, 'key': 1})
      .sort('weight')
      .where('state', 'published')
      .where('categories').in([locals.category.key])
      .exec((err, posts) => {
        if (err) return next(err);

        const post = locals.post;
        let prevPost, nextPost;

        posts.some((p, i) => {
          if (p.key == post.key) {
            if (posts[i + 1]) nextPost = posts[i + 1];
            return true;
          }

          prevPost = p;
        });

        locals.post.prev = prevPost;
        locals.post.next = nextPost;

        return next();
      });
  });

  // check the category
  view.on('init', function(next) {
    if (!catKey) return next();

    PostCategory.model.findOne({key: catKey}).exec((err, category) => {
      if (err) return next(err);

      locals.category = category;

      // load the posts based on a category
      Post.model.find({}, {'title': 1, 'key': 1})
        .sort('weight')
        .where('state', 'published')
        .where('categories').in([catKey])
        .exec((err, posts) => {
          if (err) return next(err);

          locals.posts = posts;
          return next();
        });
    });
  });

  // find the default post
  view.on('init', function(next) {
    if (postKey || catKey) return next();

    Post.model.findOne({type: 'tutorial'})
      .sort('weight')
      .where('categories', {$size: 0})
      .populate('author categories')
      .exec((err, result) => {
        if (err) return next(err);

        locals.post = result;
        return next();
      });
  });

  // Render the view
	view.render('tutorial');
};
