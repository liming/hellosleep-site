/**
 * Hellosleep 
 */
const keystone = require('keystone');
const pkg = require('./package.json');
const conf = require('./config');

keystone.init({

  'name': 'Hello Sleep',
  'brand': 'HelloSleep',

  'less': 'public',
  'static': 'public',

  'views': 'templates/views',
  'view engine': 'jade',

  'auth': true,
  'user model': 'User',
  'cookie secret': '--- your secret ---',

  'mongo': conf.mongo_uri,

  'auto update': true
});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.start();
