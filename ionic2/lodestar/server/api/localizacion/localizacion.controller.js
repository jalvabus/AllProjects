var Localizacion = require('./localizacion.model');

exports.obtenerLocalizacion = (req, res) => {
    Localizacion.find({ id_gps: req.params.id }).
        sort({ $natural: -1 })
        .limit(1)
        .exec().then((localizacion) => {
	    console.log(localizacion);
            res.json(localizacion);
        })
}

exports.historialRutas = (req, res) => {
    var idGps = req.params.idGps;
    var fechaInicial = new Date(req.body.fechaInicial);
    var fechaFinal = new Date(req.body.fechaFinal);

    var query = Localizacion.find({
        id_gps: idGps,
        createdAt: {
            $gte: fechaInicial,
            $lte: fechaFinal
        }
    }, { lat: 1, lng: 1, _id: 0 })

    query.exec().then((localizaciones) => {
        res.json(localizaciones);
    });
}

exports.historial = (req, res) => {
        var fechaInicial = new Date(req.body.fechaInicial);
        var fechaFinal = new Date(req.body.fechaFinal);
        var query = Localizacion.find({
                id_gps: req.params.id,
                createdAt: {
                        $gte: fechaInicial,
                        $lte: fechaFinal
                }
        },  {lat:1, lng: 1, _id: 0});

        query.exec().then((localizaciones)=>{
                res.json(localizaciones);
        })
}
