var express = require('express');
const swaggerUi = require('swagger-ui-express');

var router = express.Router();

const doc = require('../docs/swagger.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(doc));

router.get('/test', function(req, res, next) {
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
