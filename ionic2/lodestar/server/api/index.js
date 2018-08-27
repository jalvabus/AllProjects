var express = require('express');
var router = express.Router();
var auth = require('./../config/auth.js');
const moment = require('moment');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

var Gps = require('./gps/gps.model');
var Localizacion = require('./localizacion/localizacion.model');

var Usuario = require('./usuario/usuario.model');

var smtp = require('../config/config').smtp

var randomstring = require("randomstring");

Promise.promisifyAll(bcrypt);
var passport = auth.passport;
const secret = require('../config/config').secret

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, usuario) {
        if (err) return next(err);
        if (!usuario) {
            return res.status(401).json({ status: 'error', code: 'unauthorized' });
        } else {
            return res.json({
                token: jwt.sign({ _id: usuario._id }, secret),
                usuario
            });
        }
    })(req, res, next);
});

router.post('/registrar', function (req, res) {

    var usuario = new Usuario({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        celular: req.body.celular,
        empresa: req.body.empresa,
        correo_electronico: req.body.correo_electronico
    });

    bcrypt.genSalt(10)
        .then((salt) => {
            return bcrypt.hashSync(req.body.password, salt)
        })
        .then((password) => {
            usuario.password = password
            return usuario.save();
        })
        .then((respuesta) => {

            var archivo = path.join(__dirname, '../public/bienvenida.html');
            fs.readFile(archivo, { encoding: "utf8" }, function (error, contenido) {
                var rendered = ejs.render(contenido, { usuario: respuesta });

                var transporter = nodemailer.createTransport(smtp);

                transporter.verify(function (error, success) {

                    if (error) {
                        console.log(error);
                    } else {
                        let mailOptions = {
                            from: '"Lodestar 📡 | by Ancient" <desarrollo@ancient.mx>', to: respuesta.correo_electronico,
                            subject: 'Lodestar - Bienvenido a la red de geolocalización más grande de México',
                            text: 'Ancient - GPS',
                            html: rendered
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message %s sent: %s', info.messageId, info.response);
                        });
                    }

                });
            });



            res.json(respuesta);
        })
        .catch((err) => {
            res.status(500).json('Error: ' + err);
        })
});

router.post('/recuperarContrasena', function (req, res) {

    var password = randomstring.generate(6);

    Usuario.findOne({ correo_electronico: req.body.correo_electronico }).exec()
        .then((usuario) => {

            if (usuario) {

                bcrypt.genSalt(10)
                    .then((salt) => {
                        return bcrypt.hashSync(password, salt)
                    })
                    .then((password) => {
                        usuario.password = password
                        return usuario.save();
                    }).then((guardado) => {

                        var archivo = path.join(__dirname, '../public/recuperacion-cuenta.html');
                        fs.readFile(archivo, { encoding: "utf8" }, function (error, contenido) {
                            var rendered = ejs.render(contenido, { nombre: usuario.nombre, contrasena: password, correo_electronico: usuario.correo_electronico });

                            var transporter = nodemailer.createTransport(smtp);

                            transporter.verify(function (error, success) {

                                if (error) {
                                    console.log(error);
                                } else {
                                    let mailOptions = {
                                        from: '"Lodestar 📡 | by Ancient" <desarrollo@ancient.mx>', to: usuario.correo_electronico,
                                        subject: 'Lodestar - Recuperación de contraseña',
                                        text: 'Lodestar - GPS',
                                        html: rendered
                                    };

                                    transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                            return console.log(error);
                                        }
                                        console.log('Message %s sent: %s', info.messageId, info.response);
                                    });
                                }

                            });
                        });

                        res.json('OK');
                    })


            } else {
                res.status(404).json('Usuario no encontrado.');
            }



        });

});

router.post('/registrarGPS', function (req, res) {

    var gps = new Gps({
        imei: req.body.imei,
        noSMS: req.body.noSMS,
        id_gps: randomstring.generate(7)
    });

    gps.save()
        .then((respuesta) => {
            res.json(respuesta);
        })
});

router.post('/registrarLocalizacion', function (req, res) {
    var localizacion = new Localizacion({
        id_gps: '596516a4e44ff72e48187349',
        lat: 18.9348074,
        lng: -99.2387564
    });

    localizacion.save().then((localizacion) => {
        res.json(localizacion);
    });

});

router.post('/agregarV', function(req, res){
    Usuario.findById('5968e54c84886179c41b390f').then((usuario)=>{
       usuario.correo_electronico = 'emiliano@ancient.mx'
        usuario.save().then((respuesta)=>{
            res.json(respuesta);
        })
    })
})

router.post('/webhook-pagos/ancientech/desarrollo2017', (req, res) => {
    var data = typeof req.body == 'string' ? JSON.parse(req.body) : req.body;
    console.log(data);
    res.sendStatus(200);
})

router.post('/webhook-sms/ancientech/desarrollo2017', (req, res) => {

    var mensaje = req.body;

    console.log(mensaje);

    var msisdn = mensaje.msisdn;
    var contenido = mensaje.contenido;

    Gps.findOne({ noSMS: msisdn })
        .exec().then((gps) => {
            if (contenido === 'stop engine succeed') {
                gps.prendido = false;
                //////////////////////////////////////
                /*                
                    Fragmento de codigo para mandar email al apagar vehículo                
                */
                /////////////////////////////////////

                //////////////////////////////////////
                /*                
                    Fragmento de codigo para mandar push notification al apagar vehículo                
                */
                /////////////////////////////////////
            } else if (contenido === 'resume engine succeed') {
                gps.prendido = true;
                //////////////////////////////////////
                /*                               
                    Fragmento de codigo para mandar email al encender vehículo                           
                */
                /////////////////////////////////////

                //////////////////////////////////////
                /*                
                    Fragmento de codigo para mandar push notification al encender vehículo                
                */
                /////////////////////////////////////
            }
            else if (contenido === '') {

            }
            else if (contenido === '') {

            }

            return gps.save();
        }).catch((err) => {

        }).then((gps) => {
            if (gps.prendido == false) {
                res.send("0");
            } else {
                res.send("1");
            }
        })
})

router.get('/push/ancientech/desarrollo2017/:idGps')
    .get((req, res) => {
        var query = Vehiculo.findOne({ gps: req.params.idGps });
        query.exec()
            .then((gps) => {

            })
    })

module.exports = router;