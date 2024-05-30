// Define y exporta la clase CartsRepository
export default class CartsRepository {
  // Constructor de la clase, recibe un objeto dao (data access object)
  constructor(dao) {
    this.dao = dao; // Asigna el dao al atributo de la clase
  }

  // Método para obtener un carrito por su ID
  getCartById = (cid) => {
    return this.dao.getCartById(cid); // Llama al método getCartById del dao
  };

  // Método para crear un nuevo carrito
  createCart = (cart) => {
    return this.dao.createCart(cart); // Llama al método createCart del dao
  };

  // Método para actualizar un carrito por su ID
  updateCart = (id, cart) => {
    return this.dao.updateCart(id, cart); // Llama al método updateCart del dao
  };

  // Método para eliminar un carrito por su ID
  deleteCart = (id) => {
    return this.dao.deleteCart(id); // Llama al método deleteCart del dao
  };
}