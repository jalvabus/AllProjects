var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pago_schema = require('../pago/pago.model');

var usuario_schema = new Schema({
    nombre: String,
    apellidos: String,
    telefono: String,
    celular: String,
    empresa: String,
    correo_electronico: String,
    password: String,
    lastLogin: Date,
    registro: {type: Number, default: 1},
    vehiculos: [{type: Schema.Types.ObjectId, ref:"Vehiculo"}],
    pagos: [pago_schema],
    servicio: {type: Boolean, default: false}
});

var Usuario = mongoose.model('Usuario', usuario_schema);
module.exports = Usuario;