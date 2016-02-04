/**
 * 
 */

'use strict';

const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', function (req, res, next) {

	res.locals.navLinks = [
		{ label: '主页', key: 'home', href: '/' },
		{ label: '指南', key: 'book', href: '/books' },
		{ label: '经验谈', key: 'share', href: '/shares' },
		{ label: '联系睡吧', key: 'contact', href: 'hellosleep.site@gmail.com' },
	];

	res.locals.user = req.user;
	next();
});

keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	views: importRoutes('./views')
};

exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
}
