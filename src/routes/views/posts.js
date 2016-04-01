'use strict';

const keystone = require('keystone');
const Tip = keystone.list('Tip');
const Post = keystone.list('Post');

exports = module.exports = function(req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;


  if (req.url.indexOf('tip') > 0) locals.section = 'tip';
  else if (req.url.indexOf('recommend') > 0) locals.section = 'recommend';

  view.on('init', function(next) {
    if (locals.section !== 'tip') return next();

    Tip.paginate({
      page: req.query.page || 1,
 		  perPage: 10,
 		  maxPages: 10
    })
			.sort('-publishedDate')
      .exec((err, results) => {
        if (err) return next(err);

        locals.posts = results;
        next();
      });
  });

  view.on('init', function(next) {
    if (locals.section !== 'recommend') return next();

    Post.paginate({
      page: req.query.page || 1,
 		  perPage: 10,
 		  maxPages: 10
    })
      .where('state', 'published')
      .where('recommended', 'true')
			.sort('-publishedDate')
      .populate('author categories')
      .exec((err, results) => {
        if (err) return next(err);

        locals.posts = results;
        next();
      });
  });

  // render question view
  view.render('posts');
};
