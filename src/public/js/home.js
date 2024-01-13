// productModule.js
const path = require('path');
const fs = require('fs');

// Ruta del archivo JSON donde se almacenarán los productos
const dbPath = path.join(__dirname, 'products.json');

// Función para leer los productos desde el archivo
const readProductsFromDB = () => {
    try {
        // Lee el contenido del archivo de forma síncrona
        const productsData = fs.readFileSync(dbPath);
        
        // Parsea el contenido del archivo como JSON y lo retorna
        return JSON.parse(productsData);
    } catch (error) {
        // Maneja errores al leer el archivo de productos
        console.error('Error al leer los productos:', error.message);
        throw new Error('No se pudieron leer los productos.');
    }
};

// Función para guardar los productos en el archivo
const saveProductsToDB = (products) => {
    try {
        // Escribe el contenido de los productos en el archivo de forma síncrona
        fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));
    } catch (error) {
        // Maneja errores al guardar los productos en el archivo
        console.error('Error al guardar los productos:', error.message);
        throw new Error('No se pudieron guardar los productos');
    }
};

// Exporta las funciones para que puedan ser utilizadas en otros archivos
module.exports = { readProductsFromDB, saveProductsToDB };
