/**
 * This is where we define the route
 */

'use strict';

const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);
const babelify = require('babelify');

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
  app.get('/help', routes.views.help);
  app.get('/contribute', routes.views.contribute);
  app.get('/tutorial/:post?', routes.views.tutorial);
  app.get('/tutorial/categories/:category', routes.views.tutorial);
  app.get('/share/:share?', routes.views.share);
  app.get('/share/categories/:category', routes.views.share);
  app.get('/evaluation', routes.views.evaluation);
  app.get('/evaluation/:id?', routes.views.evaluation);

  // list of the post
  app.get('/tip', routes.views.posts);
  app.get('/recommend', routes.views.posts);
  app.get('/posts', routes.views.posts);

  // display a post
  app.get('/post/:id', routes.views.post);

  // handle search
  app.get('/search', routes.views.search);

  // api
  app.get('/api/posts/categories', routes.api.posts.listCategories);
  app.get('/api/posts/:id', routes.api.posts.getPost);
  app.post('/api/posts/:id/like', routes.api.posts.likePost);
  app.get('/api/posts/:id/comments', routes.api.posts.listComments);
  app.post('/api/posts/:id/comments', routes.api.posts.postComment);
}
