'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;
const moment = require('moment');

var Evaluation = new keystone.List('Evaluation', {
	map: { name: 'name' },
	track: true,
	autokey: { path: 'key', from: 'email', unique: true }
});

Evaluation.add({

  name: { type: String, required: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  sex: { type: String, required: true, initial: false },
  birthday: { type: Types.Date },
  status: { type: String, required: true, initial: false },
  submitDate: { type: Types.Date, index: true },

  version: { type: Types.Number, required: true, default: 0 },

  // it's a JSON string
  answers: { type: String },

  tags: { type: Types.Relationship, ref: 'Tag', many: true }
});

Evaluation.schema.virtual('formattedDate').get(function () {
  return moment(this.submitDate).locale('zh-cn').format('ll');
});

Evaluation.defaultSort = '-submitDate';
Evaluation.defaultColumns = 'name, email|20%, status|20%, tags|20%';
Evaluation.register();
