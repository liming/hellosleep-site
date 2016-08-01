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

PostComment.schema.methods.replyComment = function(comment, cb) {

  keystone.list('Post').model
    .findById(comment.post, {key: 1, title: 1, author: 1, type: 1})
    .populate('author')
    .exec((err, post) => {
      if (err) return cb(err);

      let tos = [{email: post.author.email, name: post.author.name}];

      if (comment.replyTo) tos.push({email: comment.replyTo.email, name: comment.replyTo.author});

      // send the mail to the author of current post.
      new keystone.Email('comment-reply').send({
        title: post.title,
        author: comment.author,
        content: comment.content,
        link: `/${post.type}/${post.key}`,
        to: tos,
        from: {
          name: 'HelloSleep',
          email: 'notifications@hellosleep.net'
        },
        subject: `回复：${comment.author}在[${post.title}]中的回复`
      }, cb);
  });
};

PostComment.track = true;
PostComment.defaultSort = '-publishedDate';
PostComment.defaultColumns = 'author, post, email, replyTo';
PostComment.register();
