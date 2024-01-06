const fs = require('fs').promises;

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async createCart(cart) {
        const carts = await this.getCartsFromFile();
        const newCart = {
            id: this.generateUniqueId(carts.map(c => c.id)),
            products: []
        };
        carts.push(newCart);
        await this.saveCartsToFile(carts);
    }

    async getCartById(cartId) {
        const carts = await this.getCartsFromFile();
        return carts.find(cart => cart.id === cartId);
    }

    async addProductToCart(cartId, productId, quantity) {
        const carts = await this.getCartsFromFile();
        const cartIndex = carts.findIndex(cart => cart.id === cartId);
        if (cartIndex !== -1) {
            const productIndex = carts[cartIndex].products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                carts[cartIndex].products[productIndex].quantity += quantity;
            } else {
                carts[cartIndex].products.push({ id: productId, quantity });
            }
            await this.saveCartsToFile(carts);
            return true;
        }
        return false;
    }

    async getCartsFromFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async saveCartsToFile(carts) {
        await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2), 'utf8');
    }

    generateUniqueId(existingIds) {
        let id;
        do {
            id = Math.floor(Math.random() * 1000000); // Random ID generator
        } while (existingIds.includes(id));
        return id;
    }
}

module.exports = CartManager;