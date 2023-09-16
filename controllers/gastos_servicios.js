const { response } = require('express');
const Gastos_Servicios = require('../models/gastos_servicios');

const getGastos_Servicios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ gastos_servicios, total ] = await Promise.all([Gastos_Servicios.find({estado:true}, 
                'docum_gasto num_gasto prove_gasto fecha_gasto desc_gasto subtot_gasto igv_gasto tot_gasto estado')
                .skip( desde ),
       Gastos_Servicios.countDocuments()
    ]);


    res.json({
        ok: true,
        gastos_servicios,
        total
    });

}

const crearGastos_Servicios = async(req, res) => {

    const gastos_servicios = new Gastos_Servicios( req.body) 

    try {

        const gastos_serviciosDB = await gastos_servicios.save()
        res.json({
            ok: true,
            gastos_serviciosDB
        }) 
        ;

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarGastos_Servicios = async (req, res = response) => {
    
    const id  = req.params.id;
    
    try {
        const gastos_serviciosDB = await Gastos_Servicios.findById( id );

        if ( !gastos_serviciosDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Gastos de servicio no encontrado por id',
            });
        }

        const cambiosgastos_servicios = { ...req.body,gastos_servicios: id }

        const gastos_serviciosActualizado = await Gastos_Servicios.findByIdAndUpdate( id, cambiosgastos_servicios, { new: true } )

        res.json({
            ok: true,
            gastos_servicios: gastos_serviciosActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarGastos_Servicios = async (req, res = response) => {

    const id  = req.params.id;

    try {
        
        const gastos_servicios = await Gastos_Servicios.findById( id );

        if ( !gastos_servicios ) {
            return res.status(404).json({
                ok: true,
                msg: 'El gasto por servicios no fue encontrado por id',
            });
        }

        await Gastos_Servicios.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Gasto por servicios borrado'
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
    getGastos_Servicios,
    crearGastos_Servicios,
    actualizarGastos_Servicios,
    borrarGastos_Servicios
}
