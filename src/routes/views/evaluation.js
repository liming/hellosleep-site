
const keystone = require('keystone');
const Evaluation = keystone.list('Evaluation');
const utils = require('../../common/eval_utils');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
  const locals = res.locals;
  const id = req.params.id;
  locals.section = 'evaluation';

  if (id === 'new') locals.status = 'new';

  view.on('init', function(next) {
    if (id) return next();

    Evaluation.paginate({
      page: req.query.page || 1,
 		  perPage: 10,
 		  maxPages: 10
    })
			.sort('-submitDate')
      .populate('tags')
      .exec((err, results) => {
        if (err) return next(err);

        locals.evaluations = results;
        next();
      });
  });

  view.on('init', function(next) {
    if (!id) return next();

    Evaluation.model
      .findOne({_id: id}, {email: 0})
      .populate('tags')
      .exec((err, result) => {
        const answers = utils.formatAnswers(JSON.parse(result.answers));

        locals.evaluation = result;
        locals.answers = answers;

        next(err);
    });
  });


	view.render('evaluation');
};
