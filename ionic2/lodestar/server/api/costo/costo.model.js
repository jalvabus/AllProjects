var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var costo_schema = new Schema({
    costo: Number
});

var Costo = mongoose.model('Costo', costo_schema);

module.exports = Costo;


