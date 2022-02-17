const express = require('express');
const controladorUsuario = require('../controller/usuario.controller');

const md_autentificacion = require('../middlewares/autentificacion');

const api = express.Router();

api.get('/', controladorUsuario.maestroDefault);
api.post('/registrarAlumno', controladorUsuario.registrarAlumno);
api.post('/registrarMaestro', controladorUsuario.registrarMaestro);
api.post('/login', controladorUsuario.login);
api.put('/editarUsuario/:idUsuario', md_autentificacion.Auth, controladorUsuario.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario', md_autentificacion.Auth, controladorUsuario.eliminarUsuario);

module.exports = api;