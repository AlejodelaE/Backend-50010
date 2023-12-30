const express = require('express');
const fs = require('fs').promises;

const cartsRouter = express.Router();

// Función para generar un ID único para el carrito
function generateCartId(carts) {
    const lastCart = carts[carts.length - 1];
    return lastCart ? lastCart.id + 1 : 1;
}

// POST /api/carts/
cartsRouter.post('/', async (req, res) => {
    try {
        const carts = JSON.parse(await fs.readFile('carts.json', 'utf8'));

        const newCart = {
            id: generateCartId(carts),
            products: []
        };

        carts.push(newCart);
        await fs.writeFile('carts.json', JSON.stringify(carts, null, 2));

        res.json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear carrito.');
    }
});

// GET /api/carts/:cid
cartsRouter.get('/:cid', async (req, res) => {
    try {
        const carts = JSON.parse(await fs.readFile('carts.json', 'utf8'));
        const cart = carts.find(c => c.id === parseInt(req.params.cid));

        if (cart) {
            res.json(cart);
        } else {
            res.status(404).send('Carrito no encontrado.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener carrito.');
    }
});

// POST /api/carts/:cid/product/:pid
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const carts = JSON.parse(await fs.readFile('carts.json', 'utf8'));
        const cart = carts.find(c => c.id === parseInt(req.params.cid));

        if (cart) {
            const productId = parseInt(req.params.pid);
            const existingProduct = cart.products.find(p => p.id === productId);

            if (existingProduct) {
                // Si el producto ya existe, incrementamos la cantidad
                existingProduct.quantity += 1;
            } else {
                // Si el producto no existe, lo agregamos al carrito con cantidad 1
                cart.products.push({
                    id: productId,
                    quantity: 1
                });
            }

            await fs.writeFile('carts.json', JSON.stringify(carts, null, 2));
            res.json(cart);
        } else {
            res.status(404).send('Carrito no encontrado.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar producto al carrito.');
    }
});

// DELETE /api/carts/:cid/product/:pid
cartsRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const carts = JSON.parse(await fs.readFile('carts.json', 'utf8'));
        const cart = carts.find(c => c.id === parseInt(req.params.cid));

        if (cart) {
            const index = cart.products.findIndex(p => p.id === parseInt(req.params.pid));
            if (index !== -1) {
                cart.products.splice(index, 1);
                await fs.writeFile('carts.json', JSON.stringify(carts, null, 2));
            }
            res.json(cart);
        } else {
            res.status(404).send('Carrito no encontrado.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar producto del carrito.');
    }
});

module.exports = cartsRouter;