
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
  weight: { type: Types.Number, required: true, initial: true, default: 99 }
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
