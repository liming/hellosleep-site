/**
 * Hellosleep 
 */

// Load .env for development environments
(process.env.NODE_ENV !== 'production') && require('dotenv').load();

const keystone = require('keystone');

keystone.init({

  'name': 'Hello Sleep',
  'brand': 'HelloSleep',

  'less': 'public',
  'static': 'public',

  'views': 'templates/views',
  'view engine': 'jade',

  'port': process.env.PORT || 3000,

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '--- insomnia ---',

  'mongo': process.env.MONGO_URI || 'mongodb://localhost/hellosleep',

  'auto update': true,

  // editor configuration
  'wysiwyg additional buttons': 'styleselect',

  'basedir': __dirname
});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.set('locals', {
  ga: {
    property: process.env.GA_SITE_PROPERTY,
    domain: process.env.GA_SITE_DOMAIN
  },
  env: process.env.NODE_ENV || "development"
});

keystone.start();
