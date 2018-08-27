var express = require('express');
var bodyParser = require('body-parser');

var auth = require('./auth');
var config = require('./config.json');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var passport = auth.passport;

var app = express();

app.use(session({
    key: config.secret,
    secret: config.secret,
    store: new MongoStore({
        url: config.database.db,
        collection: 'sessions'
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + './public'));
app.use(express.static(__dirname + './../../www'));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

module.exports = app;