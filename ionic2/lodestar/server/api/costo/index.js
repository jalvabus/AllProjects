var express = require('express');
var router = express.Router();
var controller = require('./costo.controller');

router.get('/', controller.consultarCosto);

module.exports = router;