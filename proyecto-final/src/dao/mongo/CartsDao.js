import cartModel from "./models/cart.model.js"; // Importa el modelo de carrito desde el archivo cart.model.js

// Define y exporta la clase CartsDao para manejar operaciones relacionadas con los carritos
export default class CartsDao {
  // Método para obtener un carrito por su ID
  getCartById = async (params, options = {}) => {
    if (options.populate) {
      // Si la opción populate está activada, utiliza populate para llenar los productos referenciados
      return cartModel.findOne(params).populate("products.product");
    }
    // Si no, simplemente encuentra el carrito y convierte el resultado a un objeto JavaScript
    return cartModel.findOne(params).lean();
  };

  // Método para crear un nuevo carrito
  createCart = () => {
    // Crea un nuevo carrito con un array de productos vacío
    return cartModel.create({ products: [], populate: true });
  };

  // Método para actualizar un carrito
  updateCart = (cid, cart) => {
    // Actualiza el carrito identificado por cid con los nuevos datos
    return cartModel.updateOne({ _id: cid }, { $set: cart });
  };

  // Método para eliminar (vaciar) un carrito
  deleteCart = (id) => {
    // Vacía el carrito identificado por id
    return cartModel.updateOne({ _id: id }, { $set: { products: [] } });
  };
}