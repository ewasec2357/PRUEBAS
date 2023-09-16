const { response } = require('express');
const Detalle_Producto = require('../models/detalle_producto');

const getDetalle_productos = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ detalle_producto, total ] = await Promise.all([Detalle_Producto.find({estado:true}, 
                'desc_unid fact_multip cant_prod prec_prod total_prod')
                .populate('Productos','nom_prod')
                .skip( desde ),
       Productos.countDocuments()
    ]);


    res.json({
        ok: true,
        detalle_producto,
        total
    });

}

const crearDetalle_producto = async(req, res) => {

    const detalle_producto = new Detalle_Producto( req.body) 

    try {

        const detalle_productoDB = await detalle_producto.save()
        res.json({
            ok: true,
            detalle_productoDB
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

const actualizarDetalle_producto = async (req, res = response) => {
    
    const id  = req.params.id;
    
    try {
        const detalle_productoDB = await Detalle_Producto.findById( id );

        if ( !detalle_productoDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Detalle de producto no encontrado por id',
            });
        }

        const cambiosdetalle_producto = { ...req.body,detalle_producto: id }

        const detalle_productoActualizado = await Detalle_Producto.findByIdAndUpdate( id, cambiosdetalle_producto, { new: true } )

        res.json({
            ok: true,
            productos: detalle_productoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarDetalle_producto = async (req, res = response) => {

    const id  = req.params.id;

    try {
        
        const detalle_producto = await Detalle_Producto.findById( id );

        if ( !detalle_producto ) {
            return res.status(404).json({
                ok: true,
                msg: 'El detalle de producto no fue encontrado por id',
            });
        }

        await Detalle_Producto.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Detalle de producto borrado'
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
    getDetalle_productos,
    crearDetalle_producto,
    actualizarDetalle_producto,
    borrarDetalle_producto
}
