'use strict';

const keystone = require('keystone');
const Post = keystone.list('Post');

exports = module.exports = function(req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;
  const q = req.query.q;

  view.on('get', function(next) {

    if (!q) return next();

    var regex = new RegExp(q, 'i');

    Post.paginate({
      page: req.query.page || 1,
 		  perPage: 10,
 		  maxPages: 10
    })
			.sort('-publishedDate')
      .where( 'title', regex )
      .exec((err, results) => {
        if (err) return next(err);

        locals.posts = results;
        next();
      });
  });

  view.render('posts');
};
