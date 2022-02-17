const jwt_simple = require('jwt-simple');
const moment = require('moment');
const claveSecreta = "clave_secreta";

exports.Auth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(500).send({ mensaje: "La peticion no tiene Autorización" });
    }

    var token = req.headers.authorization.replace(/['"]+/g, ' ');

    try {
        var payload = jwt_simple.decode(token, claveSecreta);
        //EXP = variable que contiene el tiempo de expiracion
        if (payload.exp <= moment.unix()) {
            return res.status(500).send({ mensaje: "El token ha expirado" });
        }
    } catch (err) {
        return res.status(500).send({ mensaje: "El token no es el valido" });
    }

    req.user = payload;
    next();
}