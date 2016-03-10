/**
 * 
 */

'use strict';

const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	views: importRoutes('./views'),
  api: importRoutes('./api')
};

exports = module.exports = function (app) {

  app.all('/api*', keystone.middleware.api);

	// Views
	app.get('/', routes.views.index);
  app.get('/tutorial/:post?', routes.views.tutorial);
  app.get('/tutorial/categories/:category', routes.views.tutorial);
  app.get('/share/:share?', routes.views.share);
  app.get('/share/categories/:category', routes.views.share);

  // api
  app.get('/api/post/categories', routes.api.posts.listCategories);
}
