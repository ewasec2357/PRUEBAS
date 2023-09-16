const { response } = require('express');

const Usuario = require('../models/usuario');


const getTodo = async(req, res = response ) => {

    const busqueda = req.params.busqueda;

    const [ usuarios ] = await Promise.all([
        Usuario.find({ dni: busqueda },'nombre')
    ]);

    res.json({
        ok: true,
        usuarios
    })

}

const getDocumentosColeccion = async(req, res = response ) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );

    let data = [];

    switch ( tabla ) {
        case 'clientes':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
        break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/clientes'
            });
    }
    
    res.json({
        ok: true,
        resultados: data
    })

}

module.exports = {
    getTodo,
    getDocumentosColeccion
}

