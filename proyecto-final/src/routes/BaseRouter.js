import { Router } from "express"; // Importa el módulo Router de Express
import passportCall from "../middlewares/passportCall.js"; // Importa el middleware passportCall
import executePolicies from "../middlewares/executePolicies.js"; // Importa el middleware executePolicies
import cartSetter from "../middlewares/cartSetter.js"; // Importa el middleware cartSetter
import attachLogger from "../middlewares/attachLogger.js"; // Importa el middleware attachLogger

// Clase BaseRouter que maneja las rutas base para la aplicación
export default class BaseRouter {
  constructor() {
    this.router = Router(); // Inicializa un nuevo router de Express
    this.init(); // Llama al método init (puede ser sobrescrito por clases derivadas)
  }

  // Método init para inicializar la clase (sobrescribible)
  init() {}

  // Método para obtener el router
  getRouter() {
    return this.router;
  }

  // Método para manejar las solicitudes GET
  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      attachLogger, // Adjunta el logger a la solicitud
      this.generateCustomResponses, // Genera respuestas personalizadas
      passportCall("jwt", { strategyType: "JWT" }), // Llama a passport con la estrategia JWT
      cartSetter, // Establece el carrito si es necesario
      executePolicies(policies), // Ejecuta las políticas de autorización
      this.applyCallbacks(callbacks) // Aplica los callbacks
    );
  }

  // Método para manejar las solicitudes POST
  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      attachLogger, // Adjunta el logger a la solicitud
      this.generateCustomResponses, // Genera respuestas personalizadas
      passportCall("jwt", { strategyType: "JWT" }), // Llama a passport con la estrategia JWT
      cartSetter, // Establece el carrito si es necesario
      executePolicies(policies), // Ejecuta las políticas de autorización
      this.applyCallbacks(callbacks) // Aplica los callbacks
    );
  }

  // Método para manejar las solicitudes PUT
  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      attachLogger, // Adjunta el logger a la solicitud
      this.generateCustomResponses, // Genera respuestas personalizadas
      passportCall("jwt", { strategyType: "JWT" }), // Llama a passport con la estrategia JWT
      cartSetter, // Establece el carrito si es necesario
      executePolicies(policies), // Ejecuta las políticas de autorización
      this.applyCallbacks(callbacks) // Aplica los callbacks
    );
  }

  // Método para manejar las solicitudes DELETE
  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      attachLogger, // Adjunta el logger a la solicitud
      this.generateCustomResponses, // Genera respuestas personalizadas
      passportCall("jwt", { strategyType: "JWT" }), // Llama a passport con la estrategia JWT
      cartSetter, // Establece el carrito si es necesario
      executePolicies(policies), // Ejecuta las políticas de autorización
      this.applyCallbacks(callbacks) // Aplica los callbacks
    );
  }

  // Método para generar respuestas personalizadas
  generateCustomResponses(req, res, next) {
    res.sendSuccess = (message) => {
      return res.send({ status: "success", message });
    };
    res.sendSuccessWithPayload = (payload) => {
      return res.send({ status: "success", payload });
    };
    res.sendBadRequest = (error) => {
      return res.status(400).send({ status: "error", error });
    };
    res.sendInternalError = (error) => {
      return res.status(500).send({ status: "error", error });
    };
    res.sendForbidden = (error) => {
      return res.status(403).send({ status: "error", error });
    };
    res.sendUnauthorized = (error) => {
      return res.status(401).send({ status: "error", error });
    };
    next();
  }

  // Método para aplicar los callbacks con manejo de errores
  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].sendInternalError(error); // Llama a sendInternalError en caso de error
      }
    });
  }
}