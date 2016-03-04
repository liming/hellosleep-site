
'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Share Categories Model
 * =====================
 */

var ShareCategory = new keystone.List('ShareCategory', {
	track: true,
	autokey: { from: 'name', path: 'key', unique: true }
});

ShareCategory.add({
	name: { type: String, required: true },
  description: { type: Types.Html, wysiwyg: true, height: 150 },
  weight: { type: Types.Number, required: true, initial: true, default: 99 }
});


/**
 * Relationships
 * =============
 */

ShareCategory.relationship({ ref: 'Share', refPath: 'categories', path: 'shares' });


/**
 * Registration
 * ============
 */

ShareCategory.register();
