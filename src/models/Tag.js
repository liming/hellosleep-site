'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

var Tag = new keystone.List('Tag', {
	map: { name: 'name' },
	track: true,
	autokey: { path: 'key', from: 'name', unique: true }
});

Tag.add({
  name: { type: String, required: true, initial: true, index: true },
  text: { type: String, required: true,  initial: true }
});

Tag.defaultSort = 'name';
Tag.defaultColumns = 'name, text';

Tag.register();
