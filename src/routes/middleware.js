/**
 * the middlewares
 */

'use strict';

const _ = require('lodash');

module.exports = {

  initLocals(req, res, next) {
    res.locals.navLinks = [
		  { label: '主页', key: 'home', href: '/' },
		  { label: '指南', key: 'tutorial', href: '/tutorial' },
		  { label: '经验谈', key: 'share', href: '/share' },
      { label: '小提示', key: 'tip', href: '/tip' }
	  ];

	  res.locals.user = req.user;
	  next();
  },

  flashMessages(req, res, next) {

	  var flashMessages = {
		  info: req.flash('info'),
		  success: req.flash('success'),
		  warning: req.flash('warning'),
		  error: req.flash('error')
	  };

    res.locals.messages = Object.keys(flashMessages).every(key => flashMessages[key].length) ? flashMessages : false;
	  next();
  }
}
