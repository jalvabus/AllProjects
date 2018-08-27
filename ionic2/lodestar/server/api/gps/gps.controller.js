var Gps = require('./gps.model');
var axios = require('axios');

exports.comprobarCodigo = function (req, res) {
    Gps.findOne({ id_gps: req.body.id_gps })
        .exec()
        .then((gps) => {

            if (gps) {
                if (gps.ocupado == true) {
                    return res.status(401).json({ status: 'error', code: 'error', title: 'Código inválido', message: "El código ingresado ya ha sido utilizado." });
                } else {
                    res.json(gps._id);
                }
            } else {
                return res.status(401).json({ status: 'error', code: 'error', title: 'Código inválido', message: "Verifique que el código que ingresó sea correcto." });
            }
        })
}

exports.obtenerGPS = function (req, res) {
    var query = Gps.findById(req.params.idGps);
    query.exec().then((gps) => {
        res.json({ success: true, gps });
    })
}

exports.apagarVehiculo = function (req, res) {

    Gps.findById(req.params.id).then((gps) => {
        return axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps.noSMS}&message=stop123456&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
    }).then(function (response) {
        Gps.findById(req.params.id).then((gps) => {
            gps.prendido = false;
            gps.save().exec().then((respuesta) => {
                res.json(gps);
            })
        })
    })
        .catch(function (error) {
            console.log(error);
        });
};

exports.encenderVehiculo = function (req, res) {
    Gps.findById(req.params.id).then((gps) => {
        return axios.get(`http://broadcaster.cm-operations.com/dashboard/broadcasterwebsms/bin/tu_empresa.php?msisdn=${gps.noSMS}&message=resume123456&tag=EXAMPLE&idu=595c088c87f01&user=ANCIENTMX`)
    }).then(function (response) {
        Gps.findById(req.params.id).then((gps) => {
            gps.prendido = true;
            gps.save().exec().then((respuesta) => {
                res.json(gps);
            })
        })
    })
        .catch(function (error) {
            console.log(error);
        });
}