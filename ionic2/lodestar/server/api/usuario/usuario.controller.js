var Usuario = require('../usuario/usuario.model');
var Localizacion = require('../localizacion/localizacion.model');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');
var Promise = require('bluebird');
Promise.promisifyAll(bcrypt);

exports.getUsuario = (req, res) => {

    var id = req.usuario ? req.usuario._id : req.query.id;

    var query = Usuario.findById(id).populate({
        path: 'vehiculos',
        model: 'Vehiculo',
        populate: {
            path: 'gps',
            model: 'Gps'
        }
    })

    query.exec().then((usuario) => {
        res.json(usuario);
    })
}

exports.modificarConstrasena = (req, res) => {

    Usuario.findById(req.usuario._id)
        .exec()
        .then((usuario) => {
            bcrypt.compare(req.body.actual, usuario.password, function (err, isPasswordMatch) {
                if (isPasswordMatch && req.body.nueva === req.body.confirmacion) {

                    bcrypt.genSalt(10)
                        .then((salt) => {
                            return bcrypt.hashSync(req.body.nueva, salt)
                        })
                        .then((password) => {
                            usuario.password = password
                            return usuario.save();
                        })
                        .then((guardado)=>{
                            res.json('OK');
                        })
                } else {
                    res.status(404).json('Fail');
                }
            })
        })

}

exports.modificarUsuario = (req, res) => {
    Usuario.findById(req.usuario._id)
        .exec()
        .then((usuario) => {

            usuario.nombre = req.body.nombre;
            usuario.apellidos = req.body.apellidos;
            usuario.telefono = req.body.telefono;
            usuario.celular = req.body.celular;
            usuario.empresa = req.body.empresa;

            return usuario.save();
        }).then((usuario) => {
            usuario.password = '';
            res.json(usuario);
        })
}

exports.enviarMensajeSoporte = (req, res) => {
    var id = req.usuario._id;

    Usuario.findById(id)
        .exec()
        .then((usuario) => {

            var titulo = req.body.titulo;
            var descripcion = req.body.descripcion;
            var mensaje = req.body.mensaje;

            var transporter = nodemailer.createTransport({
                service: 'Zoho',
                auth: {
                    user: 'desarrollo@ancient.mx',
                    pass: 'Nuevapass13#'
                }
            });

            var html =
                '<h1>Soporte</h1>' +
                '</br><h2>Cliente: </h2>' + req.usuario.nombre + ' ' + req.usuario.apellidos +
                '</br><h2>Telefono: </h2>' + req.usuario.telefono +
                '</br><h2>Celular: </h2>' + req.usuario.celular +
                '</br><h2>Correo electrónico: </h2>' + req.usuario.correo_electronico +
                '</br><h2>Titulo: </h2>' + req.body.titulo +
                '</br><h2>Descripcion: </h2>' + req.body.descripcion +
                '</br><h2>Mensaje: </h2>' + req.body.mensaje

            var mailOptions = {
                from: 'desarrollo@ancient.mx',
                to: 'soporte@ancient.mx',
                subject: 'Soporte - Mensaje de ' + req.usuario.nombre + ' ' + req.usuario.apellidos,
                html: ''
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email enviado: " + info);
                    res.status(200).json(info);

                }
            });


        })

}