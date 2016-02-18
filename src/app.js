/**
 * Hellosleep 
 */

// Load .env for development environments
require('dotenv').load();

const keystone = require('keystone');

import componentRoutes from 'routes/component-routes';

keystone.init({

  'name': 'Hello Sleep',
  'brand': 'HelloSleep',

  'less': 'public',
  'static': 'public',

  'views': 'templates/views',
  'view engine': 'jade',

  'react routes': componentRoutes,

  'port': process.env.PORT || 3000,

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '--- insomnia ---',

  'mongo': process.env.MONGO_URI || 'mongodb://localhost/hellosleep',

  'auto update': true
});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.start();
