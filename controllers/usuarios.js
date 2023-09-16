const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([Usuario.find({estado:true},'nom_usuario password rol')
            //.populate('especialidad','nombre')
            .skip( desde ),

        Usuario.countDocuments()
    ]);


    res.json({
        ok: true,
        usuarios,
        total
    });

}

const crearUsuario = async(req, res = response) => {

    const { nom_usuario, password } = req.body;

    try {

        const existeusuario = await Usuario.findOne({nom_usuario});

        if ( existeusuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
    
        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}

const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        // Actualizaciones
        const { password, nom_usuario, ...campos } = req.body;

        //VALIDACION USUARIO NO PUEDE SER IGUAL A UNO DE LA BD 
        if ( usuarioDB.nom_usuario !== nom_usuario ) {
            const existeusuario = await Usuario.findOne({ nom_usuario });
            if ( existeusuario ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese nombre'
                });
            }
        }

        // VALIDAMOS QUE EL 'password' VENGA, DE LO CONTRARIO SE MANTIENE EL 'password' ORIGINAL
        // Y ASIGNAMOS NUEVAMENTE EL CAMPO 'password' al objeto 'campos' para actualizar la BD
        console.log(password)

        if( password === null || password === "" || password === undefined){
            campos.password = usuarioDB.password; // LE ASIGNAMOS NUEVAMENTE EL 'password' ORIGINAL
        } else {
            campos.password = bcrypt.hashSync(password, bcrypt.genSaltSync());// LE ASIGNAMOS EL 'password' nuevo encriptado
        }

        // VALIDAMOS Y ASIGNAMOS NUEVAMENTE EL CAMPO 'nom_usuario' al objeto 'campos' para actualizar la BD
        if( nom_usuario === null || nom_usuario === '' || nom_usuario === undefined){
            campos.nom_usuario = usuarioDB.nom_usuario; // LE ASIGNAMOS NUEVAMENTE EL 'nom_usuario' ORIGINAL
        } else {
            campos.nom_usuario = nom_usuario; // LE ASIGNAMOS EL NUEVO VALOR DEL CAMPO 'nom_usuario'
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const borrarUsuario = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}