var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gps_default = { "type": "FeatureCollection", "features": [] };

var gps_schema = new Schema({
    imei: String,
    noSMS: String,
    geovalla: { type: Schema.Types.Mixed, default: gps_default },
    geovalla_alertar: { type: Boolean, default: false },
    geovalla_apagar: { type: Boolean, default: false },
    prendido: { type: Boolean, default: true },
    estado: { type: Boolean, default: true },
    fechaInicio: Date,
    fechaFin: Date,
    id_gps: String,
    ocupado: { type: Boolean, default: false },
    ultimaLocalizacion: {
        type: Schema.Types.Mixed, default: {
            lat: 0,
            lng: 0
        }
    }
});

var Gps = mongoose.model('Gps', gps_schema);

module.exports = Gps;