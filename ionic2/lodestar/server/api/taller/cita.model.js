var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cita_schema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    fecha: Date,
    completada: Boolean
});

var Cita = mongoose.model('Cita', cita_schema);
module.exports = Cita;