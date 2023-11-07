/*
    Ruta: /api/productos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getProductoById, getProductos, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get( '/:id', validarJWT , getProductoById );

router.get( '/', validarJWT , getProductos );

router.post( '/',
    [   
        validarJWT,
        check('nom_prod', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        check('id_cat', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        check('prec_prod','El precio del producto es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearProducto 
);

router.put( '/:id',
    validarJWT,       
    actualizarProducto
);

router.delete( '/:id',
    validarJWT,
    borrarProducto
);



module.exports = router;