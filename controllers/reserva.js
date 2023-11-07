const { response } = require('express');
const Reserva = require('../models/reserva');


const getReservas = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ reserva, total ] = await Promise.all([Reserva.find({},
             'persona title start end color descripcion')
            .skip( desde ),
            Reserva.countDocuments()
    ]);


    res.json({
        ok: true,
        reserva,
        total
    });

}

const crearReservas = async(req, res) => {

    const reserva = new Reserva( req.body ) 

    try {

        const reservaDB = await reserva.save()

        res.json({
            ok: true,
            reservaDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarReservas = async (req, res = response) => {
    
    const id  = req.params.id;
    
    try {
        const reservaDB = await Reserva.findById( id );

        if ( !reservaDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Reserva no encontrada por id',
            });
        }

        const cambiosreserva = {...req.body}

        const ReservaActualizada = await Reserva.findByIdAndUpdate( id, cambiosreserva, { new: true } )

        res.json({
            ok: true,
            reserva: ReservaActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarReservas = async (req, res = response) => {

    const id  = req.params.id;

    try {
        
        const reserva = await Reserva.findById( id );

        if ( !reserva ) {
            return res.status(404).json({
                ok: true,
                msg: 'La reserva no fue encontrada por id',
            });
        }

        await Reserva.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Reserva borrada'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getReservas,
    crearReservas,
    actualizarReservas,
    borrarReservas
}