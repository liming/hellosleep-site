/**
 * 
 */

'use strict';

const _ = require('lodash');

exports.flashMessages = function (req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

  res.locals.messages = Object.keys(flashMessages).every(key => flashMessages[key].length) ? flashMessages : false;
	next();
};
