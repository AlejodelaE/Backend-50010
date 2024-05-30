import winston from "winston"; // Importa el módulo winston para el manejo de logs
import config from "../config/config.js"; // Importa la configuración de la aplicación

// Define y exporta la clase LoggerService
export default class LoggerService {
  // Constructor de la clase, recibe el entorno (env)
  constructor(env) {
    // Define los niveles de logs personalizados
    this.winston_levels = {
      fatal: 0,
      error: 1,
      warning: 2,
      info: 3,
      http: 4,
      debug: 5,
    };
    // Crea el logger según el entorno
    this.logger = this.createLogger(env);
  }

  // Método para crear un logger según el entorno
  createLogger = (env) => {
    switch (config.app.LOGGER_ENV) {
      // Configuración para entorno de desarrollo
      case "development":
        return winston.createLogger({
          levels: this.winston_levels, // Usa los niveles de logs personalizados
          transports: [
            // Define el transporte para la consola
            new winston.transports.Console({
              level: "debug", // Nivel de logs para la consola
              format: winston.format.simple(), // Formato simple para la consola
            }),
            // Define el transporte para el archivo de logs de errores
            new winston.transports.File({
              filename: "./errorsDev.log", // Nombre del archivo de logs
              level: "error", // Nivel de logs para el archivo
            }),
          ],
        });

      // Configuración para entorno de producción
      case "production":
        return winston.createLogger({
          levels: this.winston_levels, // Usa los niveles de logs personalizados
          transports: [
            // Define el transporte para la consola
            new winston.transports.Console({
              level: "info", // Nivel de logs para la consola
            }),
            // Define el transporte para el archivo de logs
            new winston.transports.File({
              filename: "./errors.log", // Nombre del archivo de logs
              level: "warning", // Nivel de logs para el archivo
            }),
          ],
        });

      // Configuración por defecto (opcional)
      default:
        throw new Error(`Unknown environment: ${env}`); // Lanza un error si el entorno no es reconocido
    }
  };
}