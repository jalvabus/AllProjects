var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehiculo_schema = new Schema({
    modelo: String,
    marca: String,
    placas: String,
    gps: { type: Schema.Types.ObjectId, ref: 'Gps' }
});

var Vehiculo = mongoose.model('Vehiculo', vehiculo_schema);
module.exports = Vehiculo;