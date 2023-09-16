const { Schema, model } = require('mongoose');

const VentasSchema = Schema({

    efectivo_cochera:{
        type: Number,
        required:true
    },
    yape_cochera:{
        type: Number,
        required:true
    },
    fecha_venta:{
        type: Date,
        required:true,
    },
    subtot_venta:{
        type:Number,
        required:true
    },
    igv_venta:{
        type:Number,
        required:true
    }, 
    tot_venta:{
        type:Number,
        required:true
    },
    detalle_venta:{
        type: Array,
        items:[Schema.Types.ObjectId],
        ref: 'Venta_Temporal'
}
}, {  collection: 'Ventas' });

VentasSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Ventas', VentasSchema );