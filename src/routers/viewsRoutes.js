const express = require('express');
const router = express.Router();
const fs = require('fs');
const { Server: ServerIO } = require('socket.io');

// Leer datos de productos desde un archivo JSON
const productsData = fs.readFileSync('products.json', 'utf-8');
const productos = JSON.parse(productsData);

//home
router.get('/', (req, res) => {
    res.render('home', { productos });
});

//realTomePorducts
router.get('/', (req, res) => {
    res.render('realTimeProducts', { productos });
});

// Agregar una ruta para manejar la creación de nuevos productos por WebSocket
router.post('/add-product', (req, res) => {
    // Obtener los datos del producto del formulario
    const { productName } = req.body;

    // Agregar el nuevo producto a la lista
    productos.push(productName);

    // Emitir el evento 'addProduct' a través del socket.io al cliente
    io.emit('addProduct', productName);

    res.status(200).send('Product added successfully');
});

module.exports = router;