var conekta = require('conekta');
conekta.api_key = "key_XyNs8rBZWwfBVXRhkPrxXg";
conekta.api_version = "2.0.0";
var smtp = require('../../config/config').smtp
var Usuario = require('../usuario/usuario.model');
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

var nodemailer = require('nodemailer');

exports.generarOrden = (req, res) => {
    Usuario.findById(req.body.idUsuario)
        .then((usuario) => {

            var metodoPago = req.body.metodoPago;

            var line_items = [];

            for (var i = 0; i < +req.body.gps; i++) {
                var item = {
                    "name": "Ancientech GPS",
                    "unit_price": 672000,
                    "quantity": req.body.tiempo
                }
                line_items.push(item);
            }

            if (metodoPago === 'oxxo') {

                var archivo = path.join(__dirname, '../../public/ficha-oxxo.html');

                order = conekta.Order.create({
                    "line_items": line_items,
                    "currency": "MXN",
                    "customer_info": {
                        "name": usuario.nombre + ' ' + usuario.apellidos,
                        "email": usuario.correo_electronico,
                        "phone": usuario.celular
                    },
                    "charges": [{
                        "payment_method": {
                            "type": "oxxo_cash"
                        }
                    }]
                }, function (err, respuesta) {
                    fs.readFile(archivo, { encoding: "utf8" }, function (error, contenido) {
                        var payment_method = respuesta._json.charges.data[0].payment_method;
                        var rendered = ejs.render(contenido, { usuario: usuario, payment_method: payment_method, amount: respuesta._json.amount });

                        var transporter = nodemailer.createTransport(smtp);
                        transporter.verify(function (error, success) {

                            if (error) {
                                console.log(error);
                            } else {
                                let mailOptions = {
                                    from: smtp.auth.user, to: usuario.correo_electronico,
                                    subject: 'Lodestar - Ficha digital de pago',
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

                        usuario.pagos.push({
                            noReferencia: payment_method.reference,
                            monto: respuesta._json.amount,
                            cantidadGps: line_items.length,
                            tiempo: req.body.tiempo,
                            pagado: false,
                            expiraEn: '100000000'
                        });

                        usuario.save().then((guardado) => {
                            res.json({ success: true });
                        });
                    });
                })

            } else if ('tarjeta') {
                var archivo = path.join(__dirname, '../../public/ficha-oxxo.html');

                var token_tarjeta = req.body.token;

                conekta.Customer.create({
                    'name': req.usuario.nombre + ' ' + req.usuario.apellidos,
                    'email': req.usuario.correo_electronico,
                    'phone': '+52' + req.usuario.celular,
                    'payment_sources': [{
                        'type': 'card',
                        'token_id': req.body.token.id
                    }]
                }, function (err, res) {

                    console.log(res);

                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log(line_items)

                    order = conekta.Order.create(
                        {
                            "line_items": line_items,
                            "currency": "MXN",
                            "customer_info": {
                                "customer_id": res._id
                            },
                            "metadata": {},
                            "charges": [{
                                "payment_method": {
                                    "payment_source_id": res._json.default_payment_source_id,
                                    "type": "card"
                                }
                            }]
                        }, function (err, respuesta) {                            
                            console.log(respuesta);
                            

                        });
                });
            }
        })
}
