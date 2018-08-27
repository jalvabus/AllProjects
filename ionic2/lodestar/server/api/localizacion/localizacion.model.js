var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var localizacion_schema = new Schema({
        id_gps: {type: Schema.Types.ObjectId, ref: 'Gps'},
        lat: Number,
        lng: Number,
    }, {timestamps: { registrado: 'created_at' }});

var Localizacion = mongoose.model('Localizacion', localizacion_schema);

module.exports = Localizacion;