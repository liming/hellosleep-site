'use strict';

const keystone = require('keystone');
const Post = keystone.list('Post');

exports = module.exports = function(req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;
  const q = req.query.q;

  view.on('init', function(next) {

    console.log(q);

    if (!q) return next();

    var postsQuery = Post.model.find();
    var regex = new RegExp(q, 'i');
    postsQuery.where( 'name', regex );

    q.exec((err, results) => {
      if (err) return next(err);

      locals.posts = results;
      next();
    });

    view.render('posts');
  });
};
