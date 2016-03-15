'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Tip Model
 *
 * For simple and useful words from hellosleep
 */

var Tip = new keystone.List('Tip', {
  track: true
});

Tip.add({
  author: { type: String, index: true },
  originUrl: { type: Types.Url },
  publishedDate: { type: Types.Date, index: true },
  content: { type: Types.Textarea, initial: true },

  // tip also has relation with category. 
  categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});

Tip.defaultSort = '-publishedDate';
Tip.defaultColumns = 'content, publishedDate|20%';
Tip.register();
