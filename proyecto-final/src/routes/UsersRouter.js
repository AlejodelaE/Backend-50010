import BaseRouter from "./BaseRouter.js"; // Importa la clase BaseRouter
import userController from "../controllers/user.controller.js"; // Importa el controlador de usuarios
import uploader from "../services/uploadService.js"; // Importa el servicio de carga de archivos

// Define la clase UsersRouter que extiende de BaseRouter
class UsersRouter extends BaseRouter {
  init() {
    // Define una ruta GET para obtener todos los usuarios, accesible solo para administradores
    this.get("/", ["ADMIN"], userController.getUsers);

    // Define una ruta GET para obtener un usuario por su ID, accesible sin autenticación
    this.get("/:uid", ["NO_AUTH"], userController.getUserBy);

    // Define una ruta POST para crear un nuevo usuario, accesible para todos
    this.post("/", ["PUBLIC"], userController.createUser);

    // Define una ruta PUT para actualizar un usuario, accesible solo para usuarios autenticados
    this.put("/:user", ["USER"], userController.updateUser);

    // Define una ruta POST para subir documentos de usuario, accesible solo para usuarios autenticados
    this.post(
      "/:uid/documents",
      ["USER"], // La ruta es accesible solo para usuarios autenticados
      uploader.fields([
        { name: "profile", maxCount: 1 }, // Campo para la imagen de perfil, con un máximo de 1 archivo
        { name: "frontDni", maxCount: 1 }, // Campo para la imagen del frente del DNI, con un máximo de 1 archivo
        { name: "backDni", maxCount: 1 }, // Campo para la imagen del reverso del DNI, con un máximo de 1 archivo
        { name: "addressProof", maxCount: 1 }, // Campo para la prueba de domicilio, con un máximo de 1 archivo
        { name: "bankStatement", maxCount: 1 }, // Campo para el estado de cuenta bancario, con un máximo de 1 archivo
      ]),
      userController.uploadDocuments // Controlador para manejar la carga de documentos
    );

    // Define una ruta PUT para actualizar a usuario premium, accesible solo para usuarios autenticados
    this.put("/premium/:uid", ["USER"], userController.upgradeUser);

    // Define una ruta DELETE para eliminar un usuario, accesible solo para administradores
    this.delete("/:uid", ["ADMIN"], userController.deleteUser);
  }
}

// Crea una instancia de UsersRouter
const usersRouter = new UsersRouter();

// Exporta el router configurado
export default usersRouter.getRouter();