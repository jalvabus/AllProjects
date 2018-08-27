var express = require('express');
var router = express.Router();
var controller = require('./vehiculo.controller');

router.post('/', controller.registrarVehiculo);
router.put('/', controller.modificar);
router.post('/inicializarDispositivo', controller.inicializarDispositivo);

module.exports = router;