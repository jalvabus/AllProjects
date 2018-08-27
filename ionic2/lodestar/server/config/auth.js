var bcrypt = require('bcryptjs');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var sanitizer = require('sanitizer');
var Promise = require('bluebird');

var ExtractJwt = require('passport-jwt').ExtractJwt;

const BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');

var Usuario = require('../api/usuario/usuario.model');

Promise.promisifyAll(bcrypt);

const secret = require('../config/config').secret

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

var opts = {}
// ExtractJwt.fromAuthHeader()
opts.jwtFromRequest = ExtractJwt.versionOneCompatibility({ authScheme: 'Bearer' })

opts.secretOrKey = 'secret';

passport.use(new BearerStrategy(function (token, cb) {
    jwt.verify(token, secret, function (err, decoded) {
       
        if (err) return cb(err);
        Usuario.findById(decoded._id)
            .then((usuario) => {
                if (usuario) {
                    cb(null, usuario)
                } else {
                    cb(null, false);
                }
            })
            .catch(err => cb(err))
    });
}));

passport.use('local', new LocalStrategy({
    usernameField: 'correo_electronico',
    passwordField: 'password'
},
    function (correo_electronico, password, done) {

        correo_electronico = sanitizer.sanitize(correo_electronico);

        process.nextTick(function () {
            Usuario.findOne({ correo_electronico: correo_electronico })
                .then(function (usuario) {
                    if (usuario) { 
                        bcrypt.compare(password, usuario.password, function (err, isPasswordMatch) {
                            usuario.lastLogin = new Date()
                            usuario.save()
                            isPasswordMatch ? done(null, usuario) : done(null, false)
                        });
                    } else {
                        done(null, false);
                    }
                })
                .catch(function (err) {
                    console.error(err);
                    done(err);
                });

        });
    }
));


exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    else {
        res.redirect('/login');
    }
}


exports.isLogged = function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    else {
        res.status(401).send('Primero debes de iniciar sesión!');
    }
};

exports.isAdmin = function (req, res, next) {
    if (req.isAuthenticated() && req.user.type === 'admin') {
        return next();
    } else {
        res.status(401).send('No tienes los permisos suficientes para realizar esta acción');
    }
};



module.exports.passport = passport;