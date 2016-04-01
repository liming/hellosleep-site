
const keystone = require('keystone');
const Post = keystone.list('Post');
const Tip = keystone.list('Tip');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
  const locals = res.locals;
  locals.section = 'home';

  // load recommended articles
  view.on('init', function (next) {
    Post.model.find({}, {'content.extended': 0})
      .where('state', 'published')
      .where('recommended', 'true')
      .limit(10)
			.sort('-publishedDate')
			.populate('author categories')
      .exec((err, results) => {
        if (err) return next(err);

        locals.recommends = results;
        return next();
      });
  });

  // load latest content
  view.on('init', function (next) {
    Post.paginate({
      page: req.query.page || 1,
 		  perPage: 10,
 		  maxPages: 10
    })
			.sort('-publishedDate')
      .populate('author categories')
      .exec((err, results) => {
        if (err) return next(err);

        locals.posts = results;
        next();
      });
  });

  view.on('init', function(next) {

    Tip.model.count((err, count) => {
      if (err) return next(err);

      var rand = Math.floor(Math.random() * count);
      Tip.model.findOne().skip(rand).exec((err, result) => {
        if (err) return next(err);

        locals.tip = result;
        next();
      });
    })
  });

	view.render('index');
};
