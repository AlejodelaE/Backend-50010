const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const ProductManager = require('./product_manager');
const productRoutes = require('./routers/productRoutes');
const cartRoutes = require('./routers/cartRoutes');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const port = 8080;

const productManager = new ProductManager('products.json');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middleware para manejar solicitudes JSON y URL codificadas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const products = await productManager.getProducts();

        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener producto.' });
    }
});

// Configurar rutas de vistas
app.get('/home', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        res.status(500).send('Error al obtener productos.');
    }
});

app.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        res.status(500).send('Error al obtener productos.');
    }
});


// Socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('addProduct', async (productData) => {
        try {
            // Agregar lógica para crear un nuevo producto con los datos recibidos
            await productManager.addProduct(productData);
            console.log('Evento addProduct emitido al servidor');

            // Obtener la lista actualizada de productos después de agregar el nuevo producto
            const updatedProducts = await productManager.getProducts();

            // Emitir la lista actualizada de productos a todos los clientes conectados
            io.emit('updateProducts', updatedProducts);

            console.log('Nuevo producto agregado:', productData);
        } catch (error) {
            console.error('Error al agregar un nuevo producto:', error);
        }
    });

    socket.on('productDeleted', async () => {
        try {
            const products = await productManager.getProducts();
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});