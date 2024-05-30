import productModel from "./models/product.model.js"; // Importa el modelo de producto desde el archivo product.model.js

// Define y exporta la clase ProductsDao para manejar operaciones relacionadas con los productos
export default class ProductsDao {
  // Método para obtener productos basado en ciertos parámetros
  getProducts = (params) => {
    // Utiliza el modelo de producto para encontrar productos que coincidan con los parámetros dados y los convierte a objetos JavaScript
    return productModel.find(params).lean();
  };

  // Método para paginar productos basado en ciertos parámetros y opciones de paginación
  paginateProducts = (params, paginateOptions) => {
    // Utiliza el modelo de producto para paginar productos que coincidan con los parámetros dados y las opciones de paginación
    return productModel.paginate(params, paginateOptions);
  };

  // Método para obtener un producto basado en ciertos parámetros
  getProductsBy = (params) => {
    // Utiliza el modelo de producto para encontrar un solo producto que coincida con los parámetros dados y lo convierte a un objeto JavaScript
    return productModel.findOne(params).lean();
  };

  // Método para crear un nuevo producto
  createProduct = (product) => {
    // Utiliza el modelo de producto para crear un nuevo producto con los datos proporcionados
    return productModel.create(product);
  };

  // Método para actualizar un producto basado en su ID
  updateProduct = (id, product) => {
    // Utiliza el modelo de producto para actualizar un producto identificado por su ID con los nuevos datos
    return productModel.updateOne({ _id: id }, { $set: product });
  };

  // Método para eliminar un producto basado en su ID
  deleteProduct = (id) => {
    // Utiliza el modelo de producto para eliminar un producto identificado por su ID
    return productModel.deleteOne({ _id: id });
  };
}