/**
 * This is the model trying to build the index of post or categories. It can
 * contain posts or categories.
 */


'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

var Indice = new keystone.List('Indice', {
	track: true,
	autokey: { from: 'name', path: 'key', unique: true }
});

Indice.add({
  weight: { type: Types.Number, required: true, default: 99 },
  type: { type: Types.Select, initial: true, options: [
		{ label: '文章', value: 'post' },
		{ label: '类别', value: 'category' },
	]},
  postSelect: {
    type: Types.Relationship,
    initial: true,
    ref: 'Post',
    many: false,
    dependsOn: { type: 'post' }
  },
  categorySelect: {
    type: Types.Relationship,
    initial: true,
    ref: 'PostCategory',
    many: false,
    dependsOn: { type: 'category' }
  }
});

Indice.schema.virtual('name').get(function() {
  
});

Indice.defaultSort = 'weight';
Indice.defaultColumns = 'type, weight|20%, postSelect|20%, categorySelect|20%';
Indice.register();
