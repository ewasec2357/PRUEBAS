const { Schema, model } = require('mongoose');

const CategoriasSchema = Schema({

    nom_cat: {
        type: String,
        required:true
    },
    estado: {
        type: Boolean,
        required: true,
        default:true
    },
}, 

{  collection: 'Categorias' });


CategoriasSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Categorias', CategoriasSchema );