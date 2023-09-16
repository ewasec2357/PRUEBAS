const { Schema, model } = require('mongoose');

const Gastos_ServiciosSchema = Schema({

    docum_gasto: {
        type: String,
        required:true,
        enum:["BOLETA","FACTURA"],
        default:'FACTURA'
    },
    prove_gasto: {
        type: String,
        required:true
    },
    num_gasto: {
        type: String,
        required:true
    },
    fecha_gasto:{
        type:Date,
        required:true,
    },
    desc_gasto:{
        type:String,
        required:true
    },
    subtot_gasto:{
        type:Number,
        required:true
    },
    igv_gasto:{
        type:Number
    },
    tot_gasto:{
        type:Number,
        required:true
    },
    estado: {
        type: Boolean,
        required: true,
        default:true
    },
}, 

{  collection: 'Gastos_Servicios' });


Gastos_ServiciosSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Gastos_Servicios', Gastos_ServiciosSchema );