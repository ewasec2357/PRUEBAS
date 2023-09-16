/*
    Ruta: /api/ventatemporal
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getVenta_Temporal, crearVenta_Temporal, actualizarVenta_Temporal, borrarVenta_Temporal } = require('../controllers/venta_temporal');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getVenta_Temporal );

router.post( '/',  
    validarJWT,
    crearVenta_Temporal 
);

router.put( '/:id',
    validarJWT,       
    actualizarVenta_Temporal
);

router.delete( '/:id',
    validarJWT,
    borrarVenta_Temporal
);



module.exports = router;