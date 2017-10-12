var uploadCtrl = require('../controllers/uploadCtrl.js');

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EWS Generator' });
});

router.post('/upload', function(req, res, next) {
  uploadCtrl.upload(req, res, next);
});

module.exports = router;
