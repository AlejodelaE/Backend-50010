const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const { Server: ServerIO } = require('socket.io');
const fs = require('fs');

const ProductManager = require('./product_manager');
const cartRouter = require('./routers/cartRoutes.js');
const productRouter = require('./routers/productRoutes.js');

const productManager = new ProductManager('products.json');

// Leer datos de productos desde un archivo JSON
const productsData = fs.readFileSync('products.json', 'utf-8');
let productos = JSON.parse(productsData);

// Configuración de Express
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
const hbs = handlebars.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Rutas para renderizar páginas con la lista de productos
app.get('/', (req, res) => {
    res.render('home', { productos });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { productos });
});

// Configuración de rutas para la API
app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);

// Creación del servidor HTTP y Socket.IO
const httpServer = app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

const io = new ServerIO(httpServer);

// Evento de conexión con Socket.IO
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    emitirListaDeProductos(socket);

    socket.on('eliminarProducto', (productId) => {
        const success = eliminarProductoPorId(productId);

        socket.emit('eliminarCodigoResponse', success);

        emitirListaDeProductos();
    });

    // Manejador para el evento 'addProduct'
    socket.on('addProduct', (newProduct) => {
        agregarNuevoProducto(newProduct);

        emitirListaDeProductos();
    });
});

// Función para eliminar un producto por su ID
function eliminarProductoPorId(productId) {
    productos = productos.filter(producto => producto.id !== productId);
    return true;
}

// Función para agregar un nuevo producto a la lista
function agregarNuevoProducto(newProduct) {
    productos.push(newProduct);
}

// Función para emitir la lista de productos a un cliente específico o a todos los clientes
function emitirListaDeProductos(socket) {
    const productos = obtenerListaDeProductos();
    if (socket) {
        socket.emit('updateProducts', productos);
    } else {
        io.emit('updateProducts', productos);
    }
}

// Función para obtener la lista actualizada de productos (lógica simulada)
function obtenerListaDeProductos() {
    return productos;
}