/**
 * Share model define the article structure share by other people.
 */

'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

var Share = new keystone.List('Share', {
	map: { name: 'title' },
	track: true,
	autokey: { path: 'slug', from: 'title', unique: true }
});

Share.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  // the author name of the sharing article
	author: { type: String, required: true, initial: true },
  // the original url
  url: { type: Types.Url, required: true, initial: true },
	publishedDate: { type: Types.Date, index: true },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

Share.defaultSort = '-publishedDate';
Share.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Share.register();

