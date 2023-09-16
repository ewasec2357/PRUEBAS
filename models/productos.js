const { Schema, model } = require('mongoose');

const ProductosSchema = Schema({

    nom_prod: {
        type: String,
        required:true
    },
    barcode: {
        type: String
    },
    id_cat: {
        type: Schema.Types.ObjectId,
        ref: 'Categorias',
        required:true
    }, 
    prec_prod:{
        type:Number,
        required:true
    },
    stock_prod:{
        type:Number,
        required:true,
        default:"0"
    },
    img_prod:{
        type:String,
        required:true,
        default:"no-img"
    },
    estado: {
        type: Boolean,
        required: true,
        default:true
    },

}, 

{  collection: 'Productos' });


ProductosSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Productos', ProductosSchema );