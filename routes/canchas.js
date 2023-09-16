/*
    Ruta: /api/canchas
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getCanchas, crearCancha, actualizarCancha, borrarCancha } = require('../controllers/canchas');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getCanchas );

router.post( '/',
    [   
        validarJWT,
        check('cod_cancha',         'El codigo del alquiler es obligatorio').not().isEmpty(),
        check('ubi_cancha',         'La cancha alquilada es obligatoria').not().isEmpty(),
        check('cli_cancha',        'La persona que alquilo es obligatorio').not().isEmpty(),
        check('fecha_alq',      'La fecha de alquiler es obligatorio').not().isEmpty(),
        check('hora_ini',    'La hora de inicio es obligatorio').not().isEmpty(),
        check('hora_fin',       'La hora de fin es obligatorio').not().isEmpty(),
        check('turno_alq',          'El turno es obligatorio').not().isEmpty(),
        check('tipo_pago',      'El tipo de pago obligatorio').not().isEmpty(),
        check('monto_total',          'El total del pago es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearCancha 
);

router.put( '/:id', 
        validarJWT,
        actualizarCancha
);

router.delete( '/:id',
    validarJWT,
    borrarCancha
);



module.exports = router;