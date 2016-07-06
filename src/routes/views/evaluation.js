
const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
  const locals = res.locals;
  const id = req.params.id;
  locals.section = 'evaluation';

  if (id === 'new') locals.status = 'new';


	view.render('evaluation');
};
