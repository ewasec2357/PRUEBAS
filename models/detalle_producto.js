const { Schema, model } = require('mongoose');

const DetalleProductoSchema = Schema({

    nom_prod: {
        type: Schema.Types.ObjectId,
        ref:'Productos',
        required:true
    },
    desc_unid: {
        type: String,
        required:true,
        enum:["Paquete","Unidad","Caja"]
    }, 
    fact_multip:{
        type:Number,
        required:true
    },
    cant_prod:{
        type:Number,
        required:true
    },
    prec_prod:{
        type:Number,
        required:true
    },
    total_prod:{
        type:Number,
        required:true
    },
}, 

{  collection: 'Detalle_Producto' });


DetalleProductoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Detalle_Producto', DetalleProductoSchema );