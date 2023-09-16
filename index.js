require('dotenv').config();

const express = require('express');
const moment = require('moment-timezone');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

moment.tz.setDefault('America/Lima');
const fechaActualEnZonaHoraria = moment();
console.log(fechaActualEnZonaHoraria);

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();


// Rutas
app.use( '/api/usuarios',          require('./routes/usuarios') );
app.use( '/api/todo',              require('./routes/busquedas') );
app.use( '/api/login',             require('./routes/auth') );
//app.use( '/api/upload',            require('./routes/uploads') );
app.use( '/api/reserva',           require('./routes/reserva'));
app.use( '/api/categorias',        require('./routes/categorias'));
app.use( '/api/productos',         require('./routes/productos'));
app.use( '/api/compras',           require('./routes/compras'));
app.use( '/api/ventas',            require('./routes/ventas'));
app.use( '/api/canchas',           require('./routes/canchas'));
app.use( '/api/detalle_producto',  require('./routes/detalle_producto'));
app.use( '/api/gastos_servicios',  require('./routes/gastos_servicios'));
app.use( '/api/ventatemporal',     require('./routes/venta_temporal'));



app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

