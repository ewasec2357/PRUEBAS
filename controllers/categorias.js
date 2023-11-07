const { response } = require('express');
const Categorias = require('../models/categorias');


const getCategorias = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ categorias, total ] = await Promise.all([Categorias.find({estado:true}, 'nom_cat')
            .skip( desde ),

            Categorias.countDocuments()
    ]);


    res.json({
        ok: true,
        categorias,
        total
    });

}

const crearCategoria = async(req, res) => {

    const { nom_cat } = req.body;
    const categorias = new Categorias( req.body ) 

    try {
        const existecategoria = await Categorias.findOne({ nom_cat });
        if ( existecategoria ) {
           return res.status(400).json({
               ok: false,
               msg: 'Ya existe esa categoria'
            });
        }

        const categoriasDB = await categorias.save()

        res.json({
            ok: true,
            categoriasDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarCategoria = async (req, res = response) => {
    
    const id  = req.params.id;
    
    try {
        const categoriasDB = await Categorias.findById( id );

        if ( !categoriasDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Categoria no encontrada por id',
            });
        }

        const cambioscategoria = { ...req.body,categorias: id }

        const categoriaActualizada = await Categorias.findByIdAndUpdate( id, cambioscategoria, { new: true } )

        res.json({
            ok: true,
            categoria: categoriaActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarCategoria = async (req, res = response) => {

    const id  = req.params.id;

    try {
        
        const categoriaUpdate = await Categorias.findById( id );

        if ( !categoriaUpdate ) {
            return res.status(404).json({
                ok: true,
                msg: 'La categoria no fue encontrada por id',
            });
        }

        categoriaUpdate.estado = false;
        await Categorias.findByIdAndUpdate( id, categoriaUpdate );

        res.json({
            ok: true,
            msg: 'Categoria de baja'
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
    getCategorias,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}

