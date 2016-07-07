/**
 * the mail library for sending email
 */

'use strict';

const nodemailer = require('nodemailer');

class Email {

  constructor() {
    this.transport = nodemailer.createTransport('smtps://liming.dl%40gmail.com:smtp.gmail.com');
  }

  send(options, cb) {

    this.transport.sendMail({
      from: 'liming.dl@gmail.com',
      to: 'mli@rocketsoftware.com',
      subject: 'This is a test mail',
      text: 'Hello world 🐴',
      html: '<b>Hello world 🐴</b>'
    }, (err, info) => {
      if (err) {
        console.error(err);
        return cb(err);
      }

      console.log('Message sent: ' + info.response);
      cb();
    });
  }
};

exports = module.exports = new Email();
