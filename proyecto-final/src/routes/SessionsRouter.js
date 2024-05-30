import passportCall from "../middlewares/passportCall.js"; // Importa el middleware passportCall
import BaseRouter from "./BaseRouter.js"; // Importa la clase BaseRouter
import sessionsController from "../controllers/sessions.controller.js"; // Importa el controlador de sesiones

// Define la clase SessionsRouter que extiende de BaseRouter
class SessionsRouter extends BaseRouter {
  init() {
    // Define una ruta POST para registrar un nuevo usuario
    this.post(
      "/register",
      ["PUBLIC"], // La ruta es pública
      passportCall("register", { strategyType: "LOCALS" }), // Middleware de autenticación con Passport para el registro
      sessionsController.register // Controlador para manejar el registro
    );

    // Define una ruta POST para iniciar sesión
    this.post(
      "/login",
      ["NO_AUTH"], // La ruta es accesible solo para usuarios no autenticados
      passportCall("login", { strategyType: "LOCALS" }), // Middleware de autenticación con Passport para el login
      sessionsController.login // Controlador para manejar el inicio de sesión
    );

    // Define una ruta GET para cerrar sesión
    this.get("/logout", ["AUTH"], sessionsController.logout); // La ruta es accesible solo para usuarios autenticados y llama al controlador de logout

    // Define una ruta GET para obtener la información de la sesión actual
    this.get("/current", ["AUTH"], sessionsController.current); // La ruta es accesible solo para usuarios autenticados y llama al controlador de current

    // Define una ruta GET para autenticación con GitHub
    this.get(
      "/github",
      ["NO_AUTH"], // La ruta es accesible solo para usuarios no autenticados
      passportCall("github", { strategyType: "GITHUB" }), // Middleware de autenticación con Passport para GitHub
      async (req, res) => {} // Callback vacío
    );

    // Define una ruta GET para el callback de autenticación con GitHub
    this.get(
      "/githubcallback",
      ["NO_AUTH"], // La ruta es accesible solo para usuarios no autenticados
      passportCall("github", {
        scope: ["profile", "email"], // Ámbito de la autenticación
        strategyType: "GITHUB",
      }),
      sessionsController.githubcallback // Controlador para manejar el callback de GitHub
    );

    // Define una ruta GET para autenticación con Google
    this.get(
      "/google",
      ["NO_AUTH"], // La ruta es accesible solo para usuarios no autenticados
      passportCall("google", {
        scope: ["profile", "email"], // Ámbito de la autenticación
        strategyType: "OAUTH",
      }),
      async (req, res) => {} // Callback vacío
    );

    // Define una ruta GET para el callback de autenticación con Google
    this.get(
      "/googlecallback",
      ["NO_AUTH"], // La ruta es accesible solo para usuarios no autenticados
      passportCall("google", {
        scope: ["profile", "email"], // Ámbito de la autenticación
        strategyType: "OAUTH",
      }),
      sessionsController.googlecallback // Controlador para manejar el callback de Google
    );

    // Define una ruta POST para solicitar el restablecimiento de contraseña
    this.post(
      "/passwordRestoreRequest",
      ["PUBLIC"], // La ruta es pública
      sessionsController.passwordRestoreRequest // Controlador para manejar la solicitud de restablecimiento de contraseña
    );

    // Define una ruta PUT para restablecer la contraseña
    this.put(
      "/password-restore",
      ["PUBLIC"], // La ruta es pública
      sessionsController.passwordRestore // Controlador para manejar el restablecimiento de contraseña
    );
  }
}

// Crea una instancia de SessionsRouter
const sessionsRouter = new SessionsRouter();

// Exporta el router configurado
export default sessionsRouter.getRouter();