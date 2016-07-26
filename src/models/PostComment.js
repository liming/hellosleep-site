'use strict';

var keystone = require('keystone');
var Types = keystone.Field.Types;
const moment = require('moment');

/**
 * Post comment model definition
 */

var PostComment = new keystone.List('PostComment', {
	label: 'Comments'
});

PostComment.add({
  post: { type: Types.Relationship, initial: true, ref: 'Post', index: true },
  replyTo: { type: Types.Relationship, ref: 'PostComment' },
	author: { type: String, required: true, initial: true },
  email: { type: Types.Email, required: true, initial: true },
	publishedDate: { type: Types.Date, default: Date.now, noedit: true, index: true },
  content: { type: Types.Html, wysiwyg: false, height: 300 }
});

PostComment.schema.virtual('format.date').get(function () {
  return moment(this.publishedDate).locale('zh-cn').format('ll');
});

PostComment.schema.virtual('formed.data').get(function () {
  return {
    id: this._id,
    author: this.author,
    formatedDate: this.format.date,
    content: this.content,
    replyTo: this.replyTo && this.replyTo.author ? {author: this.replyTo.author} : undefined
  };
});

PostComment.track = true;
PostComment.defaultSort = '-publishedDate';
PostComment.defaultColumns = 'author, post, email, replyTo';
PostComment.register();
