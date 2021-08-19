const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const mercadopago = require('mercadopago');
const conectionDB = require('./db/config');

const app = express();

conectionDB();

app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use(multer({ dest: path.join(__dirname, 'public/img/uploads') }).single('image'));

//Agregar credenciales
mercadopago.configure({
    access_token: 'TEST-1868236076014981-080400-bd9c59911166fbf362fa841ed64c0b6f-201451813'
});


app.use('/api/user',require('./routes/userRouter'));
app.use('/api/rubro', require('./routes/rubroRouter'));
//app.use('/api/pedido',require('./routes/pedidoRouter'));
app.use('/api/kit', require('./routes/kitRouter'));
//app.use('/api/factura',require('./routes/facturaRouter'));

//app.use('/api/cliente',require('./routes/clienteRouter'));
app.use('/api/articulo', require('./routes/articuloRouter'));
app.use('/api/order', require('./routes/orderRouter'));
app.use('/api/feedback',require('./routes/feedbackRoute'));

app.listen((process.env.PORT), () => {
    console.log(`Server on port ${process.env.PORT}`);
})