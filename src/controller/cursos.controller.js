const Cursos = require('../models/cursos.model');
const Usuario = require('../models/usuario.model');
const Asignacion = require('../models/asigancion.model');

function agregarCursos(req, res) {
    var parametros = req.body;
    var modeloCursos = new Cursos();

    if(req.user.rol == 'Rol_Maestro') {
        if(parametros.nombreCurso) {
            modeloCursos.nombreCurso = parametros.nombreCurso;
            modeloCursos.idMaestro = req.user.sub;

            modeloCursos.save((err, cursoGuardado)  =>{
                if(err) return res.status(500).send({mensaje: 'Erros en la Peticon'});
                if(!cursoGuardado) return res.status(500).send({mensaje: 'Error en Agregar Cursos'});

                return res.status(200).send({cursos: cursoGuardado});
            })
        }
    } else {
        return res.status(404).send({mensaje: 'Ingresar Datos en Todos los Campos'})
    }
}

function editarCursos(req, res) {
    var idCurso = req.params.idCursos;
    var parametros = req.body;

    if(req.user.rol == 'Rol_Maestro') {
        Cursos.findByIdAndUpdate(idCurso, parametros, {new: true}, (err, cursoEditado) =>{
            if(err) return res.status(500).send({mensaje: 'Error en la Peticion'});
            if(!cursoEditado) return res.status(500).send({mensajes: 'Error al Editar Cursos'});

            return res.status(200).send({cursos: cursoEditado});
        })
    }
}

function eliminarCursos(req, res) {
    var idCurso = req.params.idCursos;
    var Asignacion = new Asignacion();

    Asignacion.save((err, curosEliminado) =>{
        if(err) return res.status(500).send({mensaje: 'Error en la Peticion'});
        if(!curosEliminado) return res.status(500).send({mensaje: 'Error al Agregar a Curso por Default'});
        else {
            Cursos.findByIdAndDelete(idCurso, (err, cursosEliminado) => {
                if(err) res.status(500).send({mensaje: 'Error en la Peticion'});
                if(!cursosEliminado) return res.status(500).send({menssaje: 'Error al Eliminar Curso'});
                else {
                    Asignacion.find({idCursoidCursoMaestro: idCurso}, (err, asignacionEliminada) => {
                        if(err) return res.status(500).send({menssaje: 'Error en la Peticion'});
                        if(!asignacionEliminada) return res.status(500).send({menssaje: 'Error al Eliminar Asignacion'}); 
                        else {
                            Cursos.forEach(element => {
                                Asignacion.findByIdAndDelete(element.id, (err, cursoEliminado) => {
                                    if(err) return res.status(500).send({menssaje:'Error en la Peticion'});
                                    if(!cursoEliminado) return res.status(500).send({mensaje: 'Error al Eliminar el Curso'});
                                    
                                })
                            });
                        } return res.status(200).send({mensaje: 'Eliminado Correctamente'});
                    })
                }
            })
        }
    })
}

function buscarCursos(req, res) {
    if(req.user.rol == 'Rol_Maestro') {
        Cursos.find({}, (err, cursoEncontrado) =>{
            if(err) return res.status(500).send({mensaje: 'Error en la Peticion de Cursos'});
            if(!cursoEncontrado) return res.status(500).send({mensaje: 'Error al Encontrar Cursos'});

            return res.status(200).send({curso: cursoEncontrado});
        })
    }
}

module.exports = {
    agregarCursos,
    editarCursos,
    buscarCursos,
    eliminarCursos
}