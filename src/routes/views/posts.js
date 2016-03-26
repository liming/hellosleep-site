'use strict';

const keystone = require('keystone');
const Tip = keystone.list('Tip');
const Post = keystone.list('Post');

exports = module.exports = function(req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;


  if (req.url.indexOf('tip') > 0) locals.section = 'tip';
  else if (req.url.indexOf('question') > 0) locals.section = 'question';

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

  // render question view
  view.render('posts');
};
