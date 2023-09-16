/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getUsuarios );

router.post( '/',
    [
        check('nom_usuario', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y debe tener 8 caracteres como mínimo').isLength({ min: 8 }).not().isEmpty(),      
        validarCampos,
    ], 
    crearUsuario 
);

router.put( '/:id',
    validarJWT,
    actualizarUsuario
);

router.patch( '/:id',
    validarJWT,
    actualizarUsuario
);

router.delete( '/:id',
    validarJWT,
    borrarUsuario
);



module.exports = router;