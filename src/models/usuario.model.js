const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String
})

module.exports = mongoose.model('Usuario', usuariosSchema);