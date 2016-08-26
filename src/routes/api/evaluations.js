'use strict';

const keystone = require('keystone');
const Evaluation = keystone.list('Evaluation');
const evalContent = require('../../data/evaluation.json');
const Tag = keystone.list('Tag');
const qs = require('querystring');

/**
 * Submit to create an evaluation.
 */
exports.create = function(req, res) {
  const body = req.body;

  if (!body.name &&
      !body.email &&
      !body.sex &&
      !body.status &&
      !body.answers &&
      !body.tags) {
    return res.apiResponse({ success: false, err: new Error('Incomplete evaluation.') });
  }

  Tag.model.find({name: { $in: body.tags.map(tag => tag.name) }}).exec((err, tags) => {

    new Evaluation.model({
      name: body.name,
      email: body.email,
      sex: body.sex,
      status: body.status,
      submitDate: new Date(),
      version: evalContent.version,
      answers: JSON.stringify(body.answers),
      tags: tags.map(tag => tag._id)
    }).save((err, result) => {
      if (err) return res.apiError('Create evaluation error: ', err);

      res.apiResponse({
        id: result._id
		  });
    });
  });
};

exports.find = function(req, res) {

  const query = {};
  for(let key in req.query) {
    query[key] = qs.unescape(req.query[key]);
  }

  Evaluation.model.find(query).exec((err, evaluations) => {
    if (err) return res.apiError('Find evaluations error: ', err);

    if (!evaluations.length) return res.apiNotFound(new Error('Evaluation does not exist.'), 'Evaluation does not exist.');

    res.apiResponse({
      evaluations: evaluations
		});
  });
};
