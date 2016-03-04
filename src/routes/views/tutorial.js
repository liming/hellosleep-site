
'use strict';

const keystone = require('keystone');
const PostCategory = keystone.list('PostCategory');
const Indice = keystone.list('Indice');
const Post = keystone.list('Post');

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;
  const key = locals.key = req.params.post;
  locals.section = 'tutorial';

  let type;

  // load the indices
  view.on('init', function(next) {
    Indice.model.find({})
      .sort('weight')
      .populate('postSelect', 'title key')
      .populate('categorySelect', 'name key')
      .exec((err, results) => {
        if (err) return next(err);

        locals.indices = results;
        next();
    });
  });

  // check if this is post
  // this is for the page will display a post
  view.on('init', function (next) {
    if (!key) return next();

    Post.model.findOne({
		  state: 'published',
		  key: key
	  }).populate('author categories')
      .exec((err, result) => {
        if (err) return next(err);
        if (!result) return next();

        type = 'post';
        locals.post = result;

        // current post's category. some post don't have category
        if (result.categories.length > 0) {
          locals.category = result.categories[0];
        }
      });
  });

  // check the category
  view.on('init', function(next) {
    if (!key) return next();
    if (type == 'post') return next();

    PostCategory.model.findOne({key: key}).exec((err, category) => {
      if (err) return next(err);

      locals.category = category;
      type = 'category';

      // load the posts based on a category
      Post.model.find({}, {'title': 1, 'key': 1})
        .sort('weight')
        .where('state', 'published')
        .where('categories').in([key])
        .exec((err, posts) => {
          if (err) return next(err);

          locals.posts = posts;
          return next();
        });
    });
  });

  // find the default post
  view.on('init', function(next) {
    if (key) return next();

    Indice.model.findOne({weight: 0}).exec()
      .then(result => {
        if (result.type !== 'post') return Promise.reject(new Error('The first indice should be a post'));
        return Post.model.findOne({ key: result.postSelect }).exec();
      })
      .then(result => {
        locals.post = result;
        return next();
      }).catch(next);
  });

  // Render the view
	view.render('tutorial');
};
