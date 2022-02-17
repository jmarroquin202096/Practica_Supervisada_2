const express = require('express');
const controladorAsigancion = require('../controller/asignacion.controller');
const api = express.Router();
const md_autentificacion = require('../middlewares/autentificacion');

api.post('/agregarAsignaciones', md_autentificacion.Auth, controladorAsigancion.agregarAsignacion);
api.get('/obtenerAsignaciones', md_autentificacion.Auth, controladorAsigancion.buscarAsignacion);
api.put('/editarAsignaciones/:idAsignaciones', md_autentificacion.Auth, controladorAsigancion.editarAsignacion);
api.delete('/eliminarAsignaciones/:idAsignaciones', md_autentificacion.Auth, controladorAsigancion.eliminarAsignacion);

module.exports = api;