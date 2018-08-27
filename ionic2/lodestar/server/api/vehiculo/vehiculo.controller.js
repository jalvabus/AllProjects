var Vehiculo = require('./vehiculo.model');
var Usuario = require('../usuario/usuario.model');
var Gps = require('../gps/gps.model');
var axios = require('axios');
var config_server = require('../../config/config_server_gps');

exports.registrarVehiculo = (req, res) => {
    var vehiculo = new Vehiculo({
        modelo: req.body.modelo,
        marca: req.body.marca,
        placas: req.body.placas,
        gps: req.body.gps
    });

    vehiculo.save().then((guardado) => {
        Usuario.findById(req.usuario._id).exec()
            .then((usuario) => {
                usuario.vehiculos.push(guardado);
                return usuario.save();
            })
            .then((usuario) => {
                Gps.findById(req.body.gps).exec()
                    .then((gps) => {
                        gps.ocupado = true;
                        gps.save().then((gps_guardado) => {
                            axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps_guardado.noSMS}&message=begin123456&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
                                .then((respuesta) => {
                                    return axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps_guardado.noSMS}&message=admin123456%2026262&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
                                })
                                .then((respuesta) => {
                                    return axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps_guardado.noSMS}&message=adminip123456%20${config_server.datos_server_gps.ip_server}%20${config_server.datos_server_gps.port}&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
                                })
                                .then((respuesta) => {
                                    return axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps_guardado.noSMS}&message=apn123456%20${config_server.datos_telcel.apn}&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
                                })
                                .then((respuesta) => {
                                    return axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps_guardado.noSMS}&message=gprs123456&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
                                }).then((respuesta) => {
                                    Usuario.findById(req.usuario._id)
                                        .then((usuario) => {
                                            res.json(usuario);
                                        })
                                })
                        })
                    })
            })

    })
}

exports.inicializarDispositivo = (req, res) => {
    Gps.findById(req.body.gps).exec()
        .then((gps_guardado) => {

	console.log(gps_guardado);

            axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps_guardado.noSMS}&message=begin123456&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
                .then((respuesta) => {
                    return axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps_guardado.noSMS}&message=admin123456%2026262&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
                })
                .then((respuesta) => {
                    return axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps_guardado.noSMS}&message=adminip123456%20${config_server.datos_server_gps.ip_server}%20${config_server.datos_server_gps.port}&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
                })
                .then((respuesta) => {
                    return axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps_guardado.noSMS}&message=apn123456%20${config_server.datos_telcel.apn}&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
                })
                .then((respuesta) => {
                    return axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps_guardado.noSMS}&message=gprs123456&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
                }).then((respuesta) => {
                    res.json(gps_guardado);
                })


        })
}

exports.modificar = (req, res) => {
    Vehiculo.findById(req.body._id).exec()
        .then((vehiculo) => {
            vehiculo.modelo = req.body.modelo;
            vehiculo.marca = req.body.marca;
            vehiculo.placas = req.body.placas;

            return vehiculo.save();
        }).then((vehiculo) => {
            res.json(vehiculo);
        })

}





