const express = require('express');
const controladorCursos = require('../controller/cursos.controller');
const api = express.Router();
const md_autentificacion = require('../middlewares/autentificacion');

api.post('/agregarCursos', md_autentificacion.Auth, controladorCursos.agregarCursos);
api.get('/buscarCursos', md_autentificacion.Auth, controladorCursos.buscarCursos);
api.put('/editarCursos/:idCursos', md_autentificacion.Auth, controladorCursos.editarCursos);
api.delete('/eliminarCursos/:idCursos', md_autentificacion.Auth, controladorCursos.eliminarCursos);

module.exports = api;