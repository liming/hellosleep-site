
const keystone = require('keystone');
const Post = keystone.list('Post');
const Tip = keystone.list('Tip');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
  const locals = res.locals;
  locals.section = 'home';

  // load recommended articles
  view.on('init', function (next) {
    Post.paginate({
      page: req.query.postpage || 1,
 			perPage: 5,
 			maxPages: 10
    })
      .where('state', 'published')
      .where('recommended', 'true')
			.sort('-publishedDate')
			.populate('categories')
      .exec((err, results) => {
        if (err) return next(err);

        locals.posts = results;
        return next();
      });
  });

  view.on('init', function(next) {
    Tip.paginate({
      page: req.query.tippage || 1,
 			perPage: 5,
 			maxPages: 10
    }).sort('-publishedDate').exec((err, results) => {
      if (err) return next(err);

      locals.tips = results;
      return next();
    });
  });

	view.render('index');
};
