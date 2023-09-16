const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nom_usuario: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum:["USER","ADMIN"],
        default: 'USER'
    },
    estado: {
        type: Boolean,
        required: true,
        default:true
    },
}, 

{  collection: 'Usuarios' });


UsuarioSchema.method('toJSON', function() {
    const { __v, _id, pass_usuario, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model( 'Usuario', UsuarioSchema );
