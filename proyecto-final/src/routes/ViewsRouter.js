import BaseRouter from "./BaseRouter.js"; // Importa la clase BaseRouter
import viewsController from "../controllers/views.controller.js"; // Importa el controlador de vistas

// Define la clase ViewsRouter que extiende de BaseRouter
class ViewsRouter extends BaseRouter {
  init() {
    // Define una ruta GET para la página de registro
    this.get("/register", ["NO_AUTH"], viewsController.register);

    // Define una ruta GET para la página de inicio de sesión
    this.get("/login", ["NO_AUTH"], viewsController.login);

    // Define una ruta GET para la página de perfil
    this.get("/profile", ["AUTH"], viewsController.profile);

    // Define una ruta GET para la página principal
    this.get("/", ["PUBLIC"], viewsController.home);

    // Define una ruta GET para la página de productos
    this.get("/products", ["PUBLIC"], viewsController.products);

    // Define una ruta GET para la página de productos en tiempo real
    this.get("/realTimeProducts", ["ADMIN", "PREMIUM"], viewsController.realTimeProducts);

    // Define una ruta GET para la página de chat
    this.get("/chat", ["PUBLIC"], viewsController.chat);

    // Define una ruta GET para la página del carrito
    this.get("/cart", ["AUTH"], viewsController.cart);

    // Define una ruta GET para la página de compra
    this.get("/purchase", ["AUTH"], viewsController.purchase);

    // Define una ruta GET para la página de restauración de contraseña
    this.get("/password-restore", ["PUBLIC"], viewsController.passwordRestore);

    // Define una ruta GET para la página de premium
    this.get("/premium", ["USER"], viewsController.premium);

    // Define una ruta GET para la página de creación de producto
    this.get("/productCreator", ["ADMIN", "PREMIUM"], viewsController.productCreator);
  }
}

// Crea una instancia de ViewsRouter
const viewsRouter = new ViewsRouter();

// Exporta el router configurado
export default viewsRouter.getRouter();