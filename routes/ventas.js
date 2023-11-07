/*
    Ruta: /api/ventas
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getVentaById, getVentas, crearVenta, actualizarVenta, borrarVenta } = require('../controllers/ventas');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get( '/:id', validarJWT , getVentaById );

router.get( '/', validarJWT , getVentas );

router.post( '/', validarJWT ,crearVenta );

router.put( '/:id',
    validarJWT,
    actualizarVenta
);

router.delete( '/:id',
    validarJWT,
    borrarVenta
);



module.exports = router;
