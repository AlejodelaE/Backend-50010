const fs = require('fs');

// Definición de la clase ProductManager
class ProductManager {
    constructor() {
        // Establece la ruta del archivo donde se almacenarán los productos
        this.path = 'products.json';
    }

    // Método asíncrono para añadir un nuevo producto
    async addProduct(product) {
        try {
            // Extrae el código del producto
            const { code } = product;

            // Obtiene la lista actual de productos desde el archivo
            const products = await this.getProductsFromFile();

            // Verifica si ya existe un producto con el mismo código
            const codeExists = products.some(p => p.code === code);
            if (codeExists) {
                console.log('Ya existe un producto con ese código');
                return;
            }

            // Genera un nuevo ID para el producto
            const newProduct = {
                id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                ...product
            };

            // Agrega el nuevo producto a la lista
            products.push(newProduct);

            // Guarda la lista actualizada de productos en el archivo
            await this.saveProductsToFile(products);

            // Imprime un mensaje indicando que el producto se añadió correctamente
            console.log('Producto añadido correctamente:', newProduct);

            // Devuelve el nuevo producto
            return newProduct;
        } catch (error) {
            // Maneja errores al añadir un producto
            console.log('Error al añadir el producto:', error);
        }
    }
    
    // Método asíncrono para obtener la lista de productos
    async getProducts() {
        try {
            // Retorna la lista de productos obtenida desde el archivo
            return await this.getProductsFromFile();
        } catch (error) {
            // Maneja errores al obtener la lista de productos
            console.log('Error al obtener los productos:', error);
        }
    }

    // Método asíncrono para obtener un producto por su ID
    async getProductById(id) {
        try {
            // Obtiene la lista actual de productos desde el archivo
            const products = await this.getProductsFromFile();

            // Busca el producto con el ID proporcionado
            const product = products.find(p => p.id === id);

            // Si no se encuentra el producto, imprime un mensaje indicando que no se encontró
            if (!product) {
                console.log('Producto no encontrado');
                return;
            }

            // Devuelve el producto encontrado
            return product;
        } catch (error) {
            // Maneja errores al obtener un producto por su ID
            console.log('Error obteniendo producto por ID:', error);
        }
    }

    // Método asíncrono para actualizar un producto por su ID con nuevos campos
    async updateProduct(id, updatedFields) {
        try {
            // Obtiene la lista actual de productos desde el archivo
            let products = await this.getProductsFromFile();

            // Busca el índice del producto con el ID proporcionado
            const index = products.findIndex(p => p.id === id);

            // Si no se encuentra el producto, imprime un mensaje indicando que no se encontró
            if (index === -1) {
                console.log('Producto no encontrado');
                return;
            }

            // Actualiza los campos del producto con los nuevos valores
            products[index] = { ...products[index], ...updatedFields };

            // Guarda la lista actualizada de productos en el archivo
            await this.saveProductsToFile(products);

            // Imprime un mensaje indicando que el producto se actualizó correctamente
            console.log('Producto actualizado correctamente:', products[index]);
        } catch (error) {
            // Maneja errores al actualizar un producto
            console.log('Error actualizando el producto:', error);
        }
    }

    // Método asíncrono para eliminar un producto por su ID
    async deleteProduct(id) {
        try {
            // Obtiene la lista actual de productos desde el archivo
            let products = await this.getProductsFromFile();

            // Filtra los productos para excluir el que tiene el ID proporcionado
            products = products.filter(p => p.id !== id);

            // Guarda la lista actualizada de productos en el archivo
            await this.saveProductsToFile(products);

            // Imprime un mensaje indicando que el producto se eliminó correctamente
            console.log('Producto eliminado correctamente');
        } catch (error) {
            // Maneja errores al eliminar un producto
            console.log('Error al borrar el producto:', error);
        }
    }

    // Método asíncrono para obtener la lista de productos desde el archivo
    async getProductsFromFile() {
        try {
            // Lee el contenido del archivo de productos de forma asíncrona
            const data = await fs.promises.readFile(this.path, 'utf-8');

            // Parsea el contenido del archivo como JSON y lo retorna
            return JSON.parse(data);
        } catch (error) {
            // Maneja errores al leer el archivo de productos
            if (error.code === 'ENOENT') {
                // Si el archivo no existe, retorna una lista vacía
                return [];
            } else {
                // En otros casos de error, imprime un mensaje indicando el error y retorna una lista vacía
                console.log('Error al leer el archivo:', error);
                return [];
            }
        }
    }

    // Método asíncrono para guardar la lista de productos en el archivo
    async saveProductsToFile(products) {
        try {
            // Escribe el contenido de la lista de productos en el archivo de forma asíncrona
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            // Maneja errores al escribir en el archivo de productos
            console.log('Error al escribir en el archivo:', error);
        }
    }
}

// Exporta la clase ProductManager para que pueda ser utilizada en otros archivos
module.exports = ProductManager;