var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  let message = '<h1>XPIMA API</h1>\n';
  message += '<h2>Request received</h2>\n';
  message += '<h3>Headers</h3>\n';
  message += JSON.stringify(req.headers);
  message += '<h3>Body</h3>\n';
  message += JSON.stringify(req.body);
  message += '<h3>Query</h3>\n';
  message += JSON.stringify(req.query);
  res.send(message);
});

module.exports = router;