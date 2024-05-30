import BaseRouter from "./BaseRouter.js"; // Importa la clase BaseRouter
import productsController from "../controllers/products.controller.js"; // Importa el controlador de productos

// Define la clase ProductRouter que extiende de BaseRouter
class ProductRouter extends BaseRouter {
  init() {
    // Define una ruta GET para obtener productos paginados
    this.get("/", ["PUBLIC"], productsController.paginateProducts);

    // Define una ruta GET para obtener un producto por su ID
    this.get("/:pid", ["PUBLIC"], productsController.getProductsBy);

    // Define una ruta POST para crear un nuevo producto
    this.post("/", ["ADMIN", "PREMIUM"], productsController.createProduct);

    // Define una ruta PUT para actualizar un producto por su ID
    this.put("/:pid", ["ADMIN"], productsController.updateProduct);

    // Define una ruta DELETE para eliminar un producto por su ID
    this.delete("/:pid", ["ADMIN"], productsController.deleteProduct);

    // Define una ruta GET para obtener productos simulados
    this.get(
      "/mockingproducts",
      ["PUBLIC"],
      productsController.mockingProducts
    );
  }
}

// Crea una instancia de ProductRouter
const productRouter = new ProductRouter();

// Exporta el router configurado
export default productRouter.getRouter();