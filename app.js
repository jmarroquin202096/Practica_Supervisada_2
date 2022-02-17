const express = require('express');
const cors = require('cors');
const app = express();


// IMPORTACION RUTAS
const usuariosRoutes = require('./src/routes/usuario.routes');
const cursosRoutes = require('./src/routes/cursos.routes');
const asignacionRoutes = require('./src/routes/asigancion.routes');

// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
app.use('/api', usuariosRoutes, cursosRoutes, asignacionRoutes);

module.exports = app;