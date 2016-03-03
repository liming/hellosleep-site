
'use strict';

const keystone = require('keystone');
const PostCategory = keystone.list('PostCategory');
const Indice = keystone.list('Indice');
const Post = keystone.list('Post');

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  locals.section = 'tutorial';

  const key = locals.key = req.params.post;

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

  // load the post
  view.on('init', function (next) {

    if (!key) return next();
    let type;

    // 1. find the post in the posts collection.
    // 2. find the post in the categories collection

    Post.model.count({key: key}).exec()
      .then(count => {
        if (count) return Promise.resolve('post');

        return PostCategory.model.findOne({key: key}).exec()
          .then(result => {
            if (result) {
              locals.category = result;
              return Promise.resolve('category');
            }
            else return Promise.reject(new Error(`Cannot find the key ${key}`));
          });
      })
      .then(_type => {
        type = _type;
        locals.type = type;

        if (type == 'post') {
          return findPost(key);
        }

        // if it's category. we need find a list of posts belong to this category
        return Post.model.find({}, {'title': 1, 'key': 1})
          .sort('weight')
          .where('state', 'published')
          .where('categories').in([key])
          .exec();
      })
      .then(results => {
        if (type == 'post') {
          locals.post = results;

          // current post's category. some post don't have category
          if (results.categories.length > 0) {
            locals.category = results.categories[0];
          }
        } else {
          locals.posts = results;
        }

        return next();
      })
      .catch(err => {
        err || console.error(err);
        next(err);
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
        cb();
      }).catch(err => cb(err));
  });

  // Render the view
	view.render('tutorial');

  function findPost(key) {
    return Post.model.findOne({
		  state: 'published',
		  key: key
	  }).populate('author categories').exec();
  }
};
