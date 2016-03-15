
const keystone = require('keystone');
const Post = keystone.list('Post');
const Tip = keystone.list('Tip');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
  const locals = res.locals;
  locals.section = 'home';

  // load recommended articles
  view.on('init', function (next) {
    Post.model.find({}, {'title': 1, 'key': 1, 'type': 1})
      .where('state', 'published')
      .where('recommended', 'true')
      .limit(10)
			.sort('-publishedDate')
			.populate('categories')
      .exec((err, results) => {
        if (err) return next(err);

        console.log(results);
        locals.posts = results;
        return next();
      });
  });

  // load frequently asked questions
  view.on('init', function (next) {
    Post.model.find({type: 'question'}, {'title': 1, 'key': 1, 'type': 1})
      .where('state', 'published')
      .limit(10)
			.sort('-publishedDate')
			.populate('categories')
      .exec((err, results) => {
        if (err) return next(err);

        locals.questions = results;
        return next();
      });
  });

  view.on('init', function(next) {
    Tip.model.find()
      .limit(10)
      .sort('-publishedDate')
      .exec((err, results) => {
      if (err) return next(err);

      locals.tips = results;
      return next();
    });
  });

	view.render('index');
};
