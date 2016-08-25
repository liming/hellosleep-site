'use strict';

const keystone = require('keystone');
const Evaluation = keystone.list('Evaluation');
const evalContent = require('../../data/evaluation.json');
const Tag = keystone.list('Tag');

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

  Evaluation.model.find(req.query).exec((err, evaluations) => {
    if (err) return res.apiError('Find evaluations error: ', err);

    if (!evaluations.length) return res.apiError(404, 'Evaluation not exist.');

    res.apiResponse({
      evaluations: evaluations
		});
  });
};
