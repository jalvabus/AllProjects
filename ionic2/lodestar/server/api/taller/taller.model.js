var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cita_schema = require('./cita.model');


var taller_schema = new Schema({
    nombre: String,
    correo_electronico: String,
    telefono: String,
    direccion: String,
    ubicacion: { type: Schema.Types.Mixed, default: { lat: 0, lng: 0 } },
    usuario: String,
    contrasena: String,
    citas: [cita_schema]
});

var Taller = mongoose.model('Taller', taller_schema);