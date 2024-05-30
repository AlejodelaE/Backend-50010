import BaseRouter from "./BaseRouter.js"; // Importa la clase BaseRouter
import cartsController from "../controllers/carts.controller.js"; // Importa el controlador de carritos

// Define la clase CartRouter que extiende de BaseRouter
class CartRouter extends BaseRouter {
  init() {
    // Define una ruta GET para obtener un carrito por su ID
    this.get("/:cid", ["USER", "PREMIUM"], cartsController.getCartById);

    // Define una ruta GET para realizar la compra de un carrito
    this.get("/:cid/purchase", ["USER", "PREMIUM"], cartsController.purchaseCart);

    // Define una ruta POST para crear un nuevo carrito
    this.post("/", ["USER", "PREMIUM"], cartsController.createCart);

    // Define una ruta PUT para agregar un producto a un carrito (sin autenticación)
    this.put(":cid/products/:pid", ["NO_AUTH"], cartsController.addProduct);

    // Define una ruta PUT para agregar un producto a un carrito (con autenticación)
    this.put("/products/:pid", ["USER", "PREMIUM"], cartsController.addProduct);

    // Define una ruta DELETE para eliminar un producto de un carrito
    this.delete("/:cid", ["USER", "PREMIUM"], cartsController.deleteTotalProduct);

    // Define una ruta DELETE para eliminar un carrito (solo para administradores)
    this.delete("/:cid", ["ADMIN"], cartsController.deleteCart);
  }
}

// Crea una instancia de CartRouter
const cartsRouter = new CartRouter();

// Exporta el router configurado
export default cartsRouter.getRouter();