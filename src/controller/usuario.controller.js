const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')

function maestroDefault(req, res) {
    var modeloUsuario =  Usuario();
    Usuario.find({ email: "Maestro", nombre: "Maestro"}, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            return res.status(500).send({ mensaje: 'Error en la Peticion' });

        } else {
            modeloUsuario.nombre = 'Maestro';
            modeloUsuario.apellido = 'Maestro';
            modeloUsuario.email = 'Maestro';
            modeloUsuario.rol = 'Rol_Maestro';

            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                modeloUsuario.password = passwordEncriptada;

                modeloUsuario.save((err, usuarioGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la Peticion' });
                    if (!usuarioGuardado) return res.status(500).send({ mensaje: 'nose' });

                    return res.status(200).send({ usuario: usuarioGuardado });
                })
            })
        }
    })


}

function registrarMaestro(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();

    if (parametros.nombre && parametros.apellido && parametros.email && parametros.password) {
        Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {
            if (usuarioEncontrado.length > 0) {
                return res.status(500).send({ mensaje: 'Maestro ya Registrado' });

            } else {
                modeloUsuario.nombre = parametros.nombre;
                modeloUsuario.apellido = parametros.apellido;
                modeloUsuario.email = parametros.email;
                modeloUsuario.rol = 'Rol_Maestro';

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    modeloUsuario.password = passwordEncriptada;

                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la Peticion' });
                        if (!usuarioGuardado) return res.status(500).send({ mensaje: 'nose' });

                        return res.status(200).send({ usuario: usuarioGuardado });
                    })
                })

            }
        })
    } else {
        return res.status(404).send({ mensaje: 'Debe Ingresar todos los Datos' });
    }
}



function registrarAlumno(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();
    if (parametros.nombre && parametros.apellido && parametros.email && parametros.password) {
        Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {
            if (usuarioEncontrado.length > 0) {
                return res.status(500).send({ mensaje: 'Alumno ya Registrado' });
            } else {
                modeloUsuario.nombre = parametros.nombre;
                modeloUsuario.apellido = parametros.apellido;
                modeloUsuario.email = parametros.email;
                modeloUsuario.rol = 'Rol_Alumno';

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    modeloUsuario.password = passwordEncriptada;

                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la Peticion' });
                        if (!usuarioGuardado) return res.status(500).send({ mensaje: 'Error en el Registrar Usuario' });

                        return res.status(200).send({ usuario: usuarioGuardado });
                    })
                })
            }
        })
    } else {
        return res.status(404).send({ mensaje: 'Debe Ingresar todos los Datos' });
    }
}

function login(req, res) {
    var parametros = req.body;

    Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Usuario no Encontrado' });
        if (usuarioEncontrado) {
            bcrypt.compare(parametros.password, usuarioEncontrado.password, (err, verificacionPassword) => {
                if (verificacionPassword) {
                    return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado) });
                } else {
                    return res.status(500).send({ mensaje: 'Contraseña Invalida' });
                }
            })
        } else {
            return res.status(500).send({ mensaje: 'El Usuario no se encuentra Registrado' });
        }
    })
}

function editarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;

    //Borar la propeidad de password en el body para
    delete parametros.password;

    Usuario.findByIdAndUpdate(req.user.sub, parametros, { new: true }, (err, usuariosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: " Error en la peticion" });
        if (!usuariosEncontrados) return res.status(500).send({ mensaje: "Error al editar Usuario" });

        return res.status(200).send({ usuario: usuariosEncontrados });
    });

}
function eliminarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    Usuario.findByIdAndDelete(idUser, (err, usuarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioEliminado) return res.status(404).send({ mensaje: 'Error al Eliminar el Usuario' })
        return res.status(200).send({ usuario: usuarioEliminado });
    }) 
}


module.exports = {
    login,
    registrarAlumno,
    maestroDefault,
    registrarMaestro,
    editarUsuario,
    eliminarUsuario
}