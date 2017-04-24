'use strict';

const keystone = require('keystone');
const Post = keystone.list('Post');
const PostCategory = keystone.list('PostCategory');

exports = module.exports = function(req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  locals.section = 'blog';

  // Load all categories
	view.on('init', function (next) {

		PostCategory.model.find()
      .where('blogCount', {$gt: 0})
      .sort('weight').exec((err, results) => {
			  if (err) return next(err);

			  locals.categories = results;
        return next();
		});
	});

  view.on('init', function (next) {
    if (!req.params.blog) return next();

    Post.model.findOne({key: req.params.blog}).exec((err, result) => {
      locals.post = result;
      next(err);
    });
  });


  // Load the current category filter
	view.on('init', function (next) {

    if (!req.params.category) return next();
    if (req.params.blog) return next();

		PostCategory.model.findOne({ key: req.params.category }).exec(function (err, result) {
			locals.category = result;
			next(err);
		});
	});

  // load all the posts
  view.on('init', function(next) {

    if (req.params.blog) return next();

    let query = Post.paginate({
      page: req.query.page || 1,
 			perPage: 10,
 			maxPages: 10
    })
          .where('type', 'blog')
          .where('state', 'published')
			    .sort('-publishedDate')
			    .populate('categories');

		if (locals.category) {
		  query.where('categories').in([locals.category]);
		}

		query.exec(function (err, results) {
      if (err) return next(err);

			locals.posts = results;
			next();
		});

  });

  // Render the view
	view.render('blog');
};
