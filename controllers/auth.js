const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async( req, res = response ) => {

    const { nom_usuario, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ nom_usuario });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        const passwordValido = bcrypt.compareSync( password, usuarioDB.password );
        if ( !passwordValido ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        const token = await generarJWT( usuarioDB.id );

        const role =  usuarioDB.rol;
        
        res.json({
            ok: true,
            rol : role,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const renovarToken = async(req,res = response) =>{
    
    const uid = req.uid;

    const token_nuevo = await generarJWT( uid );

    res.json({
        ok: true,
        token_nuevo
    })


}

const validarToken = ( req, res = response ) => {



    try {     
        res.json({
            ok: true, 
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


module.exports = {
    login,
    renovarToken,
    validarToken
}
