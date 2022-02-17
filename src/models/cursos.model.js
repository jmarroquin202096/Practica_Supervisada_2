const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursosSchema = new Schema({
   nombreCurso: String,
   idMaestroCurso: {type: Schema.Types.ObjectId,  ref: 'Usuario'}
})
module.exports = mongoose.model('Cursos', cursosSchema);