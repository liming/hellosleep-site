
'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

var User = new keystone.List('User', {
  track: true
});

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: false }
}, 'Permissions', {
  isAdmin: { type: Boolean, label: '可以管理睡吧' },
	isVerified: { type: Boolean, label: '有可以验证的邮箱地址' }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

// used by react client to get the user info
User.schema.virtual('short').get(function() {
  return JSON.stringify({
    name: this.name.first,
    email: this.email,
    isAdmin: this.isAdmin
  });
});

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

User.defaultColumns = 'name, email, isAdmin';
User.register();
