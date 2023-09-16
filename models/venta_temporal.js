const { Schema, model } = require('mongoose');

const Venta_TemporalSchema = Schema({

    vt_id_prod: {
        type: Schema.Types.ObjectId,
        ref:'Productos',
        required:true
    },
    vt_prec_venta: {
        type: Number,
        required:true
    },
    vt_cantidad:{
        type:Number,
        required:true
    },
    vt_total:{
        type:Number,
        required:true
    },
    vt_fecha:{
        type:Date,
        required:true
    },
    estado:{
        type:Boolean,
        default: true
    }
    
}, 

{  collection: 'Venta_Temporal' });


Venta_TemporalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Venta_Temporal', Venta_TemporalSchema );