var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  let message = '<h1>XPIMA API</h1>\n';
  message += '<h2>Documents</h2>\n';
  res.send(message);
});

module.exports = router;