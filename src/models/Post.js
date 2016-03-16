'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;
const moment = require('moment');

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	track: true,
	autokey: { path: 'key', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },

  // the key define the type of this post.
  type: { type: Types.Select, initial: true, index: true, default: 'tutorial', options: [
    { value: 'tutorial', label: '指南'},
    { value: 'share', label: '分享'},
    { value: 'blog', label: '文章'}
  ]},

  // about sharing
  sharer: { type: String, dependsOn: { type: 'share' } },
  originUrl: { type: Types.Url, dependsOn: { type: 'share' } },

	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
  weight: { type: Types.Number, required: true, default: 99 },
  recommended: { type: Types.Boolean, default: false, index: true, label: '推荐到主页' }
});

Post.schema.virtual('authorname').get(function () {
  if (this.type == 'share') return this.sharer;
  else if (this.author.name) return this.author.name.full;
});

Post.schema.virtual('formatedPublishedDate').get(function () {
  return moment(this.publishedDate).locale('zh-cn').format('ll');
});

// FIXME: what if we delete a post? need remove the track from category

Post.schema.post('init', function() {
  this._originCategories = this.categories;
  this._originType = this.type;
});

Post.schema.pre('save', function(next) {

  const PostCategory = keystone.list('PostCategory');

  // TODO:
  // 1. find the newly added categories and add the type count
  // 2. find the newly deleted categories and reduce the type count

  if (this.isModified('categories') || this.isModified('type')) {

    const typeMap = {
      'tutorial': 'tutorialCount',
      'share': 'shareCount',
      'blog': 'blogCount',
      'question': 'questionCount'
    };

    const _originTypeCount = typeMap[this._originType];
    const typeCount = typeMap[this.type];

    // reduce the type count in _originCategories
    // add the type count in categories
    let decQuery = {};
    decQuery[_originTypeCount] = -1;
    PostCategory.model.update({'key': {$in: this._originCategories}}, {$inc: decQuery}, { multi: true }).exec((err, result) => {
      if(err) return console.log(err);
      console.log(`Decrement category ${this._originCategories} field ${_originTypeCount} result: ${JSON.stringify(result)}`);

      let incQuery = {};
      incQuery[typeCount] = 1;
      PostCategory.model.update({'key': {$in: this.categories}}, {$inc: incQuery}, { multi: true }).exec((err, result) => {
        if(err) return console.log(err);
        console.log(`Increment category ${this.categories} field ${typeCount} result: ${JSON.stringify(result)}`);
      });
    });
  }

  next();
});

Post.defaultSort = '-publishedDate';
Post.defaultColumns = 'title, state|20%, type|20%, publishedDate|20%';
Post.register();
