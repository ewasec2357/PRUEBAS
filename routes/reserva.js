/*
    Ruta: /api/categorias
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getReservas, crearReservas, actualizarReservas, borrarReservas} = require('../controllers/reserva');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getReservas );

router.post( '/',validarJWT, crearReservas );

router.put( '/:id', validarJWT, actualizarReservas );

router.delete( '/:id',validarJWT, borrarReservas );

module.exports = router;


