var keystone = require('keystone');
var User = keystone.list('User');

module.exports = function (done) {
	new User.model({
		name: {
			first: 'Ming',
			last: 'Li'
		},
		email: 'liming.dl@gmail.com',
		password: 'passw0rd',
		isAdmin: true
	})
	  .save(done);
};
