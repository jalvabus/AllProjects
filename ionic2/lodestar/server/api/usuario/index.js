var express = require('express');
var router = express.Router();
var controller = require('./usuario.controller');
var auth = require('./../../config/auth');

router.put('/', controller.modificarUsuario);

router.get('/getUsuario', controller.getUsuario);
router.post('/soporte', controller.enviarMensajeSoporte);


module.exports = router;