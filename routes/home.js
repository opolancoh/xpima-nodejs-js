var express = require('express');
const swaggerUi = require('swagger-ui-express');

var router = express.Router();

const doc = require('../docs/swagger.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(doc));

module.exports = router;
