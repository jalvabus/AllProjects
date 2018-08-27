var express = require('express')
var router = express.Router();
var controller = require('./pago.controller');

router.post('/generarOrden', controller.generarOrden);

module.exports = router;