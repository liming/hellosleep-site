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
  author: { type: String, index: true, default: 'match' },
  originUrl: { type: Types.Url },
  publishedDate: { type: Types.Date, index: true },
  content: { type: Types.Textarea, initial: true },

  // tip also has relation with category. 
  categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});

Tip.schema.virtual('url').get(function () {
  if (this.originUrl) return this.originUrl;

  return 'https://www.douban.com/group/hellosleep/';
});

Tip.defaultSort = '-publishedDate';
Tip.defaultColumns = 'content, publishedDate|20%';
Tip.register();
