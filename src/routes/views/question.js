'use strict';

const keystone = require('keystone');
const Post = keystone.list('Post');

exports = module.exports = function(req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  locals.section = 'question';

  view.on('init', function(next) {

    Post.paginate({
      page: req.query.page || 1,
 		  perPage: 10,
 		  maxPages: 10
    })
      .where('type', 'question')
      .where('state', 'published')
			.sort('-publishedDate')
      .exec((err, results) => {
        if (err) return next(err);

        locals.questions = results;
        next();
      });
  });

  // render question view
  view.render('question');
};
