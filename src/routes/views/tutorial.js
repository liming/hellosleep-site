
'use strict';

const keystone = require('keystone');
const PostCategory = keystone.list('PostCategory');

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  locals.section = 'tutorial';

  // local the categories
  view.on('init', next => {
    PostCategory.model.find().sort('name').exec((err, results) => {
      if (err) return next(err);

      locals.categories = results;
      next();
    });
  });

  // Render the view
	view.render('tutorial');
};
