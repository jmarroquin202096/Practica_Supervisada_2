const Asignaciones = require('../models/asigancion.model');
const cursosModel = require('../models/cursos.model');
const Usuarios = require('../models/usuario.model');

function agregarAsignacion(req, res) {
    var parametros = req.body;
    var modeloAsignaciones = new Asignaciones();

    if(req.user.rol == 'Rol_Alumno') {
       if( parametros.idCursoMaestro && parametros.idAlumnoCurso) {
           modeloAsignaciones.idCursoMaestro = req.user.sub;
           modeloAsignaciones.idAlumnoCurso = parametros.idCursoMaestro;
           modeloAsignaciones.maxAsiganciones +1;

           if(parametros.maxAsiganciones < 3) {
               modeloAsignaciones.save((err, asignacionGuardada) => {
                   if(err) return res.status(500).send({mensaje: 'Error en la petición asignada'});
                   if(!asignacionGuardada) return res.status(500).send({mensaje: 'Error al Agregar el Asignacion'});

                   return res.status(200).send({asignacion: asignacionGuardada});
               })
           } else {
               return res.status(500).send({mensaje: 'Llego al Maximo de Cursos Asignados'});
           }
       } else {
           return res.status(500).send({mensaje: 'Error en la Peticion'})
       }
    } else {
        return res.status(500).send({mensaje: 'Debe Ingrsar todos los Parametros Obligatorios'})
    }
}

function buscarAsignacion(req, res) {
    if(req.user.rol == 'Rol_Alumno') {
        cursosModel.find({}, (err, cursosEncontrados) => {
            if(err) return res.status(500).send({mensaje: 'Error en la Peticion'});
            if(!cursosEncontrados) return res.status(500).send({mensaje: 'Error al Encontrar la Asignacion'});

            return res.status(200).send({asignacion: cursosEncontrados});
        })
    }
}

function editarAsignacion(req, res) {
    var idCurso = req.params.idCursos;
    var paramatros = req.body;

    if(req.user.rol == 'Rol_Alumno') {
        Cursos.findByIdAnsUpdate(idCurso, paramatros, {new: true}, (err, cursosEditados) => {
            if(err) return res.status(500).send({mensaje: 'Error en la Peticion'});
            if(!cursosEditados) return res.status(500).send({mensaje: 'Error al Editar la Asignacion'});

            return res.status(200).send({asignacion: cursosEditados});
        })
    } else {
        return res.status(404).send({mensaje: 'No tiene los Permisos para Editar'})
    }
}

function eliminarAsignacion(req, res) {

    var idCurso = req.params.idCursos;

    Cursos.findByIdAnsDeletar(idCurso, (err, asigancionesEliminados) => {
        if(err) return res.status(500).send({mensaje: 'Error en la Peticion'});
        if(!asigancionesEliminados) return res.status(500).send({mensaje: 'Error al Eliminar'});

        return res.status(200).send({asignacion: asigancionesEliminados});
    })
}

module.exports = {
    agregarAsignacion,
    eliminarAsignacion,
    editarAsignacion,
    buscarAsignacion
}
