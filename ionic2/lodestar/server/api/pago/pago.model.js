var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pago_schema = new Schema({
    noReferencia: String,
    monto: Number,
    cantidadGps: Number,
    tiempo: Number,
    pagado: Boolean,
    expiraEn: String
});

module.exports = pago_schema;