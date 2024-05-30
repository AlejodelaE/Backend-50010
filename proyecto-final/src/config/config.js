import dotenv from "dotenv"; // Importa el módulo dotenv para cargar variables de entorno desde un archivo .env
import { Command } from "commander"; // Importa la clase Command del módulo commander para manejar argumentos de línea de comando

// Configurar y parsear los argumentos del programa
const program = new Command(); // Crea una nueva instancia de Command
program
  .option("-m, --mode <mode>", "Modo de trabajo", "production") // Define una opción de línea de comando para el modo de trabajo, con valor por defecto "production"
  .option("-p, --port <port>", "Puerto del servidor", 8080); // Define una opción de línea de comando para el puerto del servidor, con valor por defecto 8080

program.parse(); // Parsea los argumentos de la línea de comando

// Configurar dotenv para cargar las variables de entorno adecuadas
dotenv.config({
  path: program.opts().mode === "dev" ? "./.env.dev" : "./.env.prod", // Carga el archivo .env adecuado dependiendo del modo especificado en la línea de comando
});

// Exportar la configuración
export default {
  app: {
    PORT: process.env.PORT || 8081, // Puerto del servidor, por defecto 8081 si no está definido en las variables de entorno
    ADMIN_EMAIL: process.env.ADMIN_EMAIL, // Email del administrador, tomado de las variables de entorno
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD, // Contraseña del administrador, tomada de las variables de entorno
    PERSISTENCE: process.env.PERSISTENCE || "MONGO", // Modo de persistencia, por defecto "MONGO" si no está definido en las variables de entorno
    LOGGER_ENV: process.env.LOGGER_ENV || "development", // Entorno del logger, por defecto "development" si no está definido en las variables de entorno
  },
  mongo: {
    URL: process.env.MONGO_URL || "mongodb://localhost:27017", // URL de conexión a MongoDB, por defecto "mongodb://localhost:27017" si no está definido en las variables de entorno
  },
  jwt: {
    COOKIE: process.env.JWT_COOKIE, // Nombre de la cookie para JWT, tomado de las variables de entorno
    SECRET: process.env.JWT_SECRET, // Secreto para firmar JWT, tomado de las variables de entorno
  },
  github: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID, // ID de cliente de GitHub, tomado de las variables de entorno
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET, // Secreto de cliente de GitHub, tomado de las variables de entorno
  },
  google: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID, // ID de cliente de Google, tomado de las variables de entorno
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET, // Secreto de cliente de Google, tomado de las variables de entorno
  },
  mailer: {
    USER: process.env.NODE_MAILER_USER, // Usuario de NodeMailer, tomado de las variables de entorno
    PASS: process.env.NODE_MAILER_PASSWORD, // Contraseña de NodeMailer, tomada de las variables de entorno
  },
  twilio: {
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID, // SID de cuenta de Twilio, tomado de las variables de entorno
    AUTH_TOKEN: process.env.TWILIO_TOKEN, // Token de autenticación de Twilio, tomado de las variables de entorno
    FROM: process.env.TWILIO_TEST_NUMBER, // Número de prueba de Twilio, tomado de las variables de entorno
  },
};