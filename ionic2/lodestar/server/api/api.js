var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var passport = auth.passport;

router.get('/', (req, res) => {
    res.send('Funciona el api');
});

router.all('*', function (req, res, next) {
    passport.authenticate('bearer', function (err, usuario) {
        if (err) return next(err);
        if (usuario) {
            req.usuario = usuario;
            return next();
        } else {
            return res.status(401).json({ status: 'error', code: 'unauthorized' });
        }
    })(req, res, next);
});

router.use('/usuario/', require('./usuario'));
router.use('/costo/', require('./costo'));
router.use('/pago/', require('./pago'));
router.use('/gps/', require('./gps'));
router.use('/vehiculo/', require('./vehiculo'));
router.use('/localizacion/', require('./localizacion'));

module.exports = router;