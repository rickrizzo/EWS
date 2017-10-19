var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
  sendMail: function(address, content, username, password) {

    var transporter = nodemailer.createTransport(smtpTransport({
      host: 'mail.rpi.edu',
      port: 587,
      auth: {
        user: username,
        pass: password
      }
    }));

    return transporter.sendMail({
      from: username + '@rpi.edu',
      to: address,
      subject: 'Checking In',
      bcc: username + '@rpi.edu',
      html: content
    }, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
};
