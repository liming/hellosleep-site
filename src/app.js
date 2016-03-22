/**
 * Hellosleep 
 */

// Load .env for development environments
require('dotenv').load();

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
  'wysiwyg override toolbar': false,
  'wysiwyg menubar': false,
  'wysiwyg additional buttons': 'styleselect, blockquote, searchreplace ,'
    + ' forecolor backcolor,  media, preview print ',
  'wysiwyg additional plugins': 'example, anchor,'
    + ' autolink, autosave, bbcode, charmap, contextmenu, '
    + ' directionality, emoticons, fullpage, hr, media, '
    + ' paste, preview, print, searchreplace, textcolor'
  /*'wysiwyg additional options': {
    external_plugins: {
      relative_urls: false,
      visualblocks_default_state: true,
      'stylebuttons':'public/js/tinymce/plugins/stylebuttons/plugin.js'
    }
  }*/
});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.start();
