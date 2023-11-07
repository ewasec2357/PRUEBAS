/*
    Ruta: /api/inventario
*/
const { Router } = require('express');

const { getInventario, crearInventario} = require('../controllers/inventario');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getInventario );

router.post( '/',validarJWT, crearInventario );

module.exports = router;


