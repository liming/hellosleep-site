/**
 * Hellosleep 
 */

// Load .env for development environments
(process.env.NODE_ENV !== 'production') && require('dotenv').load();

const keystone = require('keystone');

keystone.init({

  'name': '睡吧',
  'brand': '睡吧',

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

//  'session store': 'mongo',

  // editor configuration
  'wysiwyg additional buttons': 'styleselect',

  'basedir': __dirname,

  // using mailgun as the mail service. visit mail gun dashboard for mailgun api
  // information: https://mailgun.com/app/dashboard
  'email transport': 'mailgun',

  'emails': 'templates/emails'
});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.set('locals', {
  ga: {
    property: process.env.GA_SITE_PROPERTY,
    domain: process.env.GA_SITE_DOMAIN
  },
  env: process.env.NODE_ENV || "development",
  host: (function() {
		return (keystone.get('host') || 'http://localhost:') + (keystone.get('port') || '3000');
	})()
});

// setup emails
if (process.env.MAILGUN_API_KEY) {
  keystone.set('mailgun api key', process.env.MAILGUN_API_KEY);
  keystone.set('mailgun domain', process.env.MAILGUN_DOMAIN);
}

keystone.start();
