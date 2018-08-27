var Costo = require('./costo.model');

exports.consultarCosto = (req, res) => {
    var query = Costo.find();
    query.exec().then((costo) => {
        res.json(costo);
    });
}

