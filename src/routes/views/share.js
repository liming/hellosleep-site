'use strict';

const keystone = require('keystone');
const Share = keystone.list('Share');
const ShareCategory = keystone.list('ShareCategory');

exports = module.exports = function(req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  locals.section = 'shares';

  // load all share categories
  // Load all categories
	view.on('init', function (next) {

		ShareCategory.model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.categories = results;

			// Load the counts for each category
			async.each(locals.categories, function (category, next) {

				keystone.list('Share').model.count().where('state', 'published').where('categories').in([category.id]).exec(function (err, count) {
					category.shareCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});

		});

	});

  // Load the current category filter
	view.on('init', function (next) {

		if (req.params.category) {
			ShareCategory.model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

  // load all the shares
  view.on('init', function(next) {

    let query = Share.paginate({
      page: req.query.page || 1,
 			perPage: 10,
 			maxPages: 10})
      .where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.category) {
		  query.where('categories').in([locals.category]);
		}

		query.exec(function (err, results) {
			locals.posts = results;
			next(err);
		});

  });

  // Render the view
	view.render('share');
};
