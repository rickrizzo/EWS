var mailCtrl = require('../controllers/mailCtrl.js');
var xlsxCtrl = require('../controllers/xlsxCtrl.js');

var formidable = require('formidable');

module.exports = {
  upload: function(req, res, next) {
    var form = formidable.IncomingForm();
    var sent = 0;
    form.parse(req, function(err, fields, files) {
      xlsxCtrl.parseEWS(files.ews.path).forEach(function(student) {
        if(fields.reason == 'Other Reason') {
          return
        }
        if(fields.hallSubsection == 'Barton A') {
          if (student['room'] % 1000 >= 300) {
            return;
          }
        }
        if(fields.hallSubsection == 'Barton B') {
          if (student['room'] % 1000 < 300) {
            return;
          }
        }
        var emailContent = '<p>Hello ' + student['name'] + ',</p>' +
                           '<p>' + fields.emailContent + '</p>' +
                           '<p>Best,<br>LA ' + fields.name + '</p>';
        mailCtrl.sendMail(student['email'], emailContent, fields.username, fields.password);
        sent += 1;
      });
      res.send(sent + ' email(s) sent');
    });
  }
};
