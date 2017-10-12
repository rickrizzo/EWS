var mailCtrl = require('../controllers/mailCtrl.js');
var xlsxCtrl = require('../controllers/xlsxCtrl.js');

var cheerio = require('cheerio');
var formidable = require('formidable');
var fs = require('fs');
var request = require('request');

module.exports = {
  upload: function(req, res, next) {
    if (!fs.existsSync('ews')){
      fs.mkdirSync('ews');
    }
    var form = formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      var oldpath = files.ews.path;
      var newpath = 'ews/' + files.ews.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        var ews = xlsxCtrl.parseEWS(newpath);
        sent = 0
        ews.forEach(function(student) {
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
          var emailContent = '<p>Hello ' + student['name'] + ',</p><p>' + fields.emailContent + '</p><p>Best,<br>LA ' + fields.name + '</p>';
          mailCtrl.sendMail(student['email'], emailContent, fields.username, fields.password);
          sent += 1;
        });
        fs.unlink(newpath, function(err) {
          if(err) { console.log(err); }
        });
        res.send(sent + ' email(s) sent');
      });
    });
  }
};
