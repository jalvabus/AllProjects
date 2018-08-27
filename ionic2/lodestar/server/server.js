var config = require('./config');
var app = require('./config/express');
var colors = require('colors');
var mongoose = require('mongoose');

mongoose.connect(config.db);

////////////////////RUTAS//////////////////////
app.use('/api/', require('./api/api'));
app.use('/', require('./api'));

/////////////////////////////////////////////

app.use(function (req, res) {
    res.status(404).json('Not found')
})

app.use(function (err, req, res) {
    console.error(err)
    res.status(500).json({
        message: 'Ocurrió algo inesperado dentro de la aplicación',
    })
});

app.listen(config.port);
console.log(colors.green('=========== Iniciando aplicación. Puerto ' + config.port + ' ============'));
