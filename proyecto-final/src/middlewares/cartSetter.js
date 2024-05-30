import { cartsService } from "../services/index.js"; // Importa el servicio de carritos desde el índice de servicios

// Define la función middleware `cartSetter`
const cartSetter = async (req, res, next) => {
  // Si el usuario está autenticado y hay una cookie de carrito
  if (req.user && req.cookies.cart) {
    // Opcionalmente, limpia la cookie de carrito
    res.clearCookie("cart");
    return next(); // Llama a la siguiente función de middleware
  }

  // Si no hay una cookie de carrito y el usuario no está autenticado
  if (!req.cookies.cart && !req.user) {
    const cart = await cartsService.createCart(); // Crea un nuevo carrito
    res.cookie("cart", cart._id.toString()); // Establece una cookie con el ID del carrito
  }

  next(); // Llama a la siguiente función de middleware
};

export default cartSetter; // Exporta la función middleware como el valor por defecto del módulo