/*
    Ruta: /api/detalle_producto
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getDetalle_productos, crearDetalle_producto, actualizarDetalle_producto, borrarDetalle_producto } = require('../controllers/detalle_producto');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getDetalle_productos );

router.post( '/',
    [   
        validarJWT,
        check('nom_prod',    'El nombre del producto es obligatorio').not().isEmpty(),
        check('desc_unid',   'La descripción de la unidad es obligatorio').not().isEmpty(),
        check('fact_multip', 'El nombre del factor de multiplicación es obligatorio').not().isEmpty(),
        check('cant_prod',   'La cantidad de productos es obligatoria').not().isEmpty(),
        check('prec_prod',   'El precio del producto es obligatorio').not().isEmpty(),
        check('total_prod',  'El precio total del producto es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearDetalle_producto 
);

router.put( '/:id',
    
    validarJWT,
    actualizarDetalle_producto
);

router.delete( '/:id',
    validarJWT,
    borrarDetalle_producto
);



module.exports = router;