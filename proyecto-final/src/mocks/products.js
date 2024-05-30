import { faker } from "@faker-js/faker/locale/es"; // Importa la biblioteca faker con la configuración regional en español

// Exporta la función `generateProducts`
export const generateProducts = () => {
  // Retorna un objeto que representa un producto generado aleatoriamente
  return {
    id: faker.database.mongodbObjectId(), // Genera un ID de MongoDB aleatorio
    title: faker.commerce.productName(), // Genera un nombre de producto aleatorio
    description: faker.commerce.productDescription(), // Genera una descripción de producto aleatoria
    category: faker.commerce.department(), // Genera una categoría de producto aleatoria
    code: faker.commerce.isbn(10), // Genera un código ISBN aleatorio de 10 dígitos
    stock: faker.number.int({ min: 10, max: 100 }), // Genera una cantidad de stock aleatoria entre 10 y 100
    price: faker.commerce.price(), // Genera un precio de producto aleatorio
    thumbnail: faker.image.url(100, 100, "product", true), // Genera una URL de imagen de producto aleatoria con las dimensiones 100x100
  };
};