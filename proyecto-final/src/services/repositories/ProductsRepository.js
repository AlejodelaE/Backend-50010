// Define y exporta la clase ProductsRepository
export default class ProductsRepository {
  // Constructor de la clase, recibe un objeto dao (data access object)
  constructor(dao) {
    this.dao = dao; // Asigna el dao al atributo de la clase
  }

  // Método para obtener productos basado en ciertos parámetros
  getProducts = (params) => {
    return this.dao.getProducts(params); // Llama al método getProducts del dao con los parámetros dados
  };

  // Método para paginar productos basado en ciertos parámetros y opciones de paginación
  paginateProducts = (params, paginateOptions) => {
    return this.dao.paginateProducts(params, paginateOptions); // Llama al método paginateProducts del dao con los parámetros y opciones de paginación dadas
  };

  // Método para obtener un producto basado en ciertos parámetros
  getProductBy = (params) => {
    return this.dao.getProductsBy(params); // Llama al método getProductsBy del dao con los parámetros dados
  };

  // Método para crear un nuevo producto
  createProduct = (product) => {
    return this.dao.createProduct(product); // Llama al método createProduct del dao con el producto dado
  };

  // Método para actualizar un producto por su ID
  updateProduct = (id, product) => {
    return this.dao.updateProduct(id, product); // Llama al método updateProduct del dao con el ID del producto y los datos del producto dados
  };

  // Método para eliminar un producto por su ID
  deleteProduct = (id) => {
    return this.dao.deleteProduct(id); // Llama al método deleteProduct del dao con el ID del producto dado
  };
}