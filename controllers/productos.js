const { response } = require('express');
const Productos = require('../models/productos');

const getProductoById = async(req, res = response) => {

    const id  = req.params.id;
    
  
        const ProductoById = await Productos.findById( id ).populate({path:'id_cat',select:'nom_cat', model:'Categorias' });

        if ( !ProductoById ) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }



    res.json({
        ok: true,
        ProductoById
    });

}

const getProductos = async(req, res = response) => {


    const [productos, total]= await Promise.all([Productos.find({estado:true})
                            .populate({path:'id_cat',select:'nom_cat', model:'Categorias' }),
                            Productos.countDocuments()]);

    res.json({
        ok: true,
        productos,
        total
    });

}

const crearProducto = async(req, res = response) => {

    const { nom_prod } = req.body;
    const productos = new Productos( req.body) 

    try {
        const existeproducto = await Productos.findOne({ nom_prod });
        if ( existeproducto ) {
           return res.status(400).json({
               ok: false,
               msg: 'Ya existe ese producto'
            });
        }


        const productosDB = await productos.save()
        res.json({
            ok: true,
            productosDB
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

const actualizarProducto = async (req, res = response) => {
    
    const id  = req.params.id;
    
    try {
        const productosDB = await Productos.findById( id );

        if ( !productosDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }

        const cambiosproductos = { ...req.body,productos: id }

        const productoActualizado = await Productos.findByIdAndUpdate( id, cambiosproductos, { new: true } )

        res.json({
            ok: true,
            productos: productoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarProducto = async (req, res = response) => {

    const id  = req.params.id;

    try {
        
        const productoUpdate = await Productos.findById( id );

        if ( !productoUpdate ) {
            return res.status(404).json({
                ok: true,
                msg: 'El producto no fue encontrado por id',
            });
        }

        productoUpdate.estado = false;
        await Productos.findByIdAndUpdate( id, productoUpdate)

        res.json({
            ok: true,
            msg: 'Producto de baja'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            error: error
        })
    }
}


module.exports = {
    getProductoById,
    getProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto
}
