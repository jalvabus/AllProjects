var express = require('express');
var router = express.Router();

var controller = require('./localizacion.controller');

router.get('/:id', controller.obtenerLocalizacion);
router.post('/historial/:id', controller.historial);

module.exports = router;