/*
    Ruta: /api/compras
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getCompras, crearCompra, borrarCompra, getCompraIdProducto } = require('../controllers/compras');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getCompras );

router.get( '/:id', validarJWT , getCompraIdProducto );

router.post( '/',
    [   
        validarJWT,
        check('fecha_comp', 'La fecha de compra es obligatoria').not().isEmpty(),
        check('tipo_doc_comp', 'El tipo de documento de compra es obligatorio').not().isEmpty(),
        check('subtot_comp', 'El subtotal de la compra es obligatorio').not().isEmpty(),
        check('igv_comp', 'El igv de la compra es obligatorio').not().isEmpty(),
        check('tot_comp', 'El total de la compra es obligatorio').not().isEmpty(),
        check('detalle_comp', 'El detalle de la compra es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearCompra, 
);

router.delete( '/:id',
    validarJWT,
    borrarCompra
);



module.exports = router;