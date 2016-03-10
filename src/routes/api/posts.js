'use strict';

const keystone = require('keystone');
const PostCategory = keystone.list('PostCategory');

exports.listCategories = function(req, res) {
  PostCategory.model.find().sort('name').exec((err, results) => {
    if (err) return res.apiError('database error', err);

    res.apiResponse({
			posts: results
		});
  });
};
