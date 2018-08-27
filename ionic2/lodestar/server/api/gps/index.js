var express = require('express');
var router = express.Router();

var controller = require('./gps.controller');

router.post('/comprobarCodigo', controller.comprobarCodigo);
router.get('/obtenerGPS/:idGps', controller.obtenerGPS);
router.get('/apagarVehiculo/:id', controller.apagarVehiculo);
router.get('/activarVehiculo/:id', controller.encenderVehiculo);

module.exports = router;