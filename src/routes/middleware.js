/**
 * the middlewares
 */

'use strict';

const _ = require('lodash');
const keystone = require('keystone');

module.exports = {

  initLocals(req, res, next) {
    var locals = res.locals;

    locals.navLinks = [
		  { label: '主页', key: 'home', href: '/' },
		  { label: '指南', key: 'tutorial', href: '/tutorial' },
		  { label: '经验谈', key: 'share', href: '/share' },
      { label: '博客', key: 'blog', href: '/blog' }
//      { label: '睡眠评估', key: 'evaluation', href: '/evaluation' }
	  ];

    locals.basedir = keystone.get('basedir');

	  locals.user = req.user;

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
