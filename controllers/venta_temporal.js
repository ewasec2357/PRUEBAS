const { response } = require('express');
const Venta_Temporal = require('../models/venta_temporal');

const getVenta_TemporalById = async(req, res = response) => {

    const id  = req.params.id;
    
  
        const VentaTemporalById = await Venta_Temporal.findById( id ).populate({path:'vt_id_prod',select:'nom_prod', model:'Productos' });

        if ( !VentaTemporalById ) {
            return res.status(404).json({
                ok: true,
                msg: 'Venta no encontrado por id',
            });
        }

    res.json({
        ok: true,
        VentaTemporalById
    });

}

const getVenta_Temporal = async(req, res = response) => {

    const [ venta_temporal, total ] = await Promise.all([Venta_Temporal.find({estado:true},
                'vt_id_prod vt_prec_venta vt_cantidad vt_total vt_fecha')
                .populate({path:'vt_id_prod',select:'nom_prod', model:'Productos' }),
                ,Venta_Temporal.countDocuments()]);

    res.json({
        ok: true,
        venta_temporal,
        total
    });

}

const crearVenta_Temporal = async (req, res) => {
    const ventas_temporales = req.body; // Suponiendo que req.body es un array de objetos
    
    try {
      const ventas_temporalesDB = [];
      for (let i = 0; i < ventas_temporales.length; i++) {
        const venta_temporal = new Venta_Temporal(ventas_temporales[i]);
        const venta_temporalDB = await venta_temporal.save();
        ventas_temporalesDB.push(venta_temporalDB);
      }
  
      res.json({
        ok: true,
        ventas_temporalesDB,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
      });
    }
  }

const actualizarVenta_Temporal = async (req, res = response) => {
    
    const id  = req.params.id;
    
    try {
        const venta_temporalDB = await Venta_Temporal.findById( id );

        if ( !venta_temporalDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Venta temporal no encontrada por id',
            });
        }

        const cambiosventa_temporal = { ...req.body,venta_temporal: id }

        const venta_temporalActualizada = await Venta_Temporal.findByIdAndUpdate( id, cambiosventa_temporal, { new: true } )

        res.json({
            ok: true,
            venta_temporal: venta_temporalActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarVenta_Temporal = async (req, res = response) => {

    const id  = req.params.id;

    try {
        
        const venta_temporal = await Venta_Temporal.findById( id );

        if ( !venta_temporal ) {
            return res.status(404).json({
                ok: true,
                msg: 'Venta temporal no encontrada por id',
            });
        }

        await Venta_Temporal.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Venta temporal borrada con éxito'
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
    getVenta_TemporalById,
    getVenta_Temporal,
    crearVenta_Temporal,
    actualizarVenta_Temporal,
    borrarVenta_Temporal
}
