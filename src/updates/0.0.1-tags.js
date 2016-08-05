/**
 * Add tags into database
 */

const keystone = require('keystone');
const Tag = keystone.list('Tag');

function addTag(tag) {
  return new Promise((resolve, reject) => {

    new Tag.model({
		  name: tag.name,
      text: tag.text
	  }).save(err => {
      if (err) return reject(err);

      return resolve();
    });
  });
}

function removeTags() {
  return new Promise((resolve, reject) => {
    Tag.model.remove({}).exec(err => {
      if (err) return reject(err);

      return resolve();
    });
  });
}

module.exports = function (done) {

  const evaluation = require('../data/evaluation.json');

  let addTags = [];
  evaluation.tags.forEach(tag => addTags.push(addTag(tag)));

  removeTags()
    .then(() => Promise.all(addTags))
    .then(() => done())
    .catch(err => done(err));
};
