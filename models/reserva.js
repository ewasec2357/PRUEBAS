const { Schema, model } = require('mongoose');

const ReservaSchema = Schema({

    persona: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true,
    },
    color: {
        primary: { type: String, required: true }
      },
    descripcion: {
        type: String
    }  
}, 

{  collection: 'Reserva' });


ReservaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Reserva', ReservaSchema );
