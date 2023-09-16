/*
    Ruta: /api/gastos_servicios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getGastos_Servicios, crearGastos_Servicios, actualizarGastos_Servicios, borrarGastos_Servicios } = require('../controllers/gastos_servicios');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getGastos_Servicios );

router.post( '/',
    [   
        validarJWT,
        check('prove_gasto',    'El nombre del proveedor del gasto es obligatorio').not().isEmpty(),
        check('fecha_gasto',    'La fecha del gasto es obligatoria').not().isEmpty(),
        check('desc_gasto',     'La descripcion del gasto es obligatorio').not().isEmpty(),
        check('subtot_gasto',   'El subtotal del gasto es obligatorio').not().isEmpty(),
        check('tot_gasto',      'El total del gasto es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearGastos_Servicios 
);

router.put( '/:id', 
    validarJWT,
    actualizarGastos_Servicios
);

router.delete( '/:id',
    validarJWT,
    borrarGastos_Servicios
);



module.exports = router;