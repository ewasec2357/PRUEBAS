/*
    Ruta: /api/categorias
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getCategorias, crearCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getCategorias );

router.post( '/',
    [   
        validarJWT,
        check('nom_cat', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    
        validarCampos,
    ], 
    crearCategoria 
);

router.put( '/:id', 
    validarJWT, 
    actualizarCategoria );

router.delete( '/:id',
    validarJWT,
    borrarCategoria
);



module.exports = router;