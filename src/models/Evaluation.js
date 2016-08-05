'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

var Evaluation = new keystone.List('Evaluation', {
	map: { name: 'name' },
	track: true,
	autokey: { path: 'key', from: 'email', unique: true }
});

Evaluation.add({

  name: { type: String, required: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  sex: { type: String, required: true, initial: false },
  status: { type: String, required: true, initial: false },
  submitDate: { type: Types.Date, index: true },

  version: { type: Types.Number, required: true, default: 0 },

  // it's a JSON string
  answers: { type: String },

  tags: { type: Types.Relationship, ref: 'Tag', many: true }
});

Evaluation.defaultSort = '-submitDate';
Evaluation.defaultColumns = 'name, email|20%, status|20%, tags|20%';
Evaluation.register();
