import LoggerService from "../services/LoggerService.js"; // Importa el servicio de logger desde el archivo LoggerService.js

const logger = new LoggerService("development"); // Crea una nueva instancia de LoggerService con el entorno de "development"

// Middleware para adjuntar el logger a la solicitud
const attachLogger = (req, res, next) => {
  req.logger = logger.logger; // Adjunta el logger a la solicitud
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}` // Registra el método HTTP, la URL y la hora actual
  );
  next(); // Llama a la siguiente función de middleware
};

export default attachLogger; // Exporta el middleware como el valor por defecto del módulo