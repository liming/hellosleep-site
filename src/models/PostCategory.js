
'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Post Categories Model
 * =====================
 */

var PostCategory = new keystone.List('PostCategory', {
	track: true,
	autokey: { from: 'name', path: 'key', unique: true }
});

PostCategory.add({
	name: { type: String, required: true },
  description: { type: Types.Html, wysiwyg: true, height: 150 },
  weight: { type: Types.Number, required: true, initial: true, default: 99, index: true },
  // the count of share posts
  shareCount: { type: Types.Number, default: 0, noedit: true, index: true },
  tutorialCount: { type: Types.Number, default: 0, noedit: true, index: true },
  blogCount: { type: Types.Number, default: 0, noedit: true, index: true },
  questionCount: { type: Types.Number, default: 0, noedit: true, index: true }
});


/**
 * Relationships
 * =============
 */

PostCategory.relationship({ ref: 'Post', refPath: 'categories', path: 'posts' });


/**
 * Registration
 * ============
 */

PostCategory.register();
