const { Schema, model } = require('mongoose');

const ComprasSchema = Schema({

    numero_comp: {
        type: String,
    },
    ruc_comp:{
        type: String
    },
    tipo_doc_comp: {
        type: String,
        enum:["BOLETA","FACTURA"],
        default:"FACTURA",
        required: true
    },
    prove_comp: {
        type: String,
    },  
    fecha_comp: {
        type: Date,
        required:true
    },
    subtot_comp:{
        type:Number,
        required:true
    },
    igv_comp:{
        type:Number,
        required:true
    },
    tot_comp:{
        type:Number,
        required:true
    },
    estado: {
        type: Boolean,
        required: true,
        default:true
    },
    detalle_comp:{
            type: Array,
            items:[Schema.Types.Array],
            ref: 'Detalle_Producto',
    }
}, 

{  collection: 'Compras' });


ComprasSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Compras', ComprasSchema );