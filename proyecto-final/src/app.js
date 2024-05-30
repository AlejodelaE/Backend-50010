import express from "express"; // Importa el módulo express para manejar el servidor web
import { Server } from "socket.io"; // Importa el módulo socket.io para manejo de WebSockets
import mongoose from "mongoose"; // Importa el módulo mongoose para manejar la base de datos MongoDB
import handlebars from "express-handlebars"; // Importa el módulo express-handlebars para manejar las vistas con Handlebars
import cookieParser from "cookie-parser"; // Importa el módulo cookie-parser para manejo de cookies
import swaggerJSDoc from "swagger-jsdoc"; // Importa el módulo swagger-jsdoc para generación de documentación Swagger
import swaggerUIExpress from "swagger-ui-express"; // Importa el módulo swagger-ui-express para servir la documentación Swagger

// Importa las rutas desde los archivos correspondientes
import productsRouter from "./routes/ProductsRouter.js";
import cartsRouter from "./routes/CartRouter.js";
import viewsRouter from "./routes/ViewsRouter.js";
import SessionsRouter from "./routes/SessionsRouter.js";
import usersRouter from "./routes/UsersRouter.js";

import __dirname from "./utils.js"; // Importa la utilidad para obtener el directorio actual
import config from "./config/config.js"; // Importa la configuración de la aplicación
import initializePassportStrategies from "./config/passport.config.js"; // Importa la configuración de las estrategias de Passport

const app = express(); // Inicializa la aplicación Express

const PORT = process.env.PORT || 8081; // Define el puerto en el cual el servidor escuchará, usando el valor de la variable de entorno PORT o 8081 por defecto

const connection = mongoose.connect(config.mongo.URL); // Conecta a la base de datos MongoDB usando la URL de la configuración
console.log("Base de datos conectada"); // Muestra un mensaje en la consola indicando que la base de datos está conectada

// Configuración de Swagger
const swaggerSpecOptions = {
  definition: {
    openapi: "3.0.1", // Versión de OpenAPI
    info: {
      title: "Kinetoscope", // Título de la API
      description: "E-commerce sobre videojuegos", // Descripción de la API
    },
  },
  apis: [`${__dirname}/docs/**/*.yml`], // Ruta a los archivos YML con la documentación de la API
};

const swaggerSpec = swaggerJSDoc(swaggerSpecOptions); // Genera la especificación Swagger
app.use(
  "/api-docs",
  swaggerUIExpress.serve,
  swaggerUIExpress.setup(swaggerSpec)
); // Sirve la documentación Swagger en la ruta /api-docs

// Configuración del motor de vistas Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`); // Define el directorio de vistas

// Middleware para servir archivos estáticos, parsear JSON, URL-encoded y manejar cookies
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initializePassportStrategies(); // Inicializa las estrategias de Passport

// Rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", SessionsRouter);
app.use("/api/users", usersRouter);

// Ruta de prueba para el logger
app.use("/loggerTest", async (req, res) => {
  req.logger.log("fatal", "Logger test fatal");
  req.logger.log("error", "Logger test error");
  req.logger.log("warning", "Logger test warning");
  req.logger.log("info", "Logger test info");
  req.logger.log("http", "Logger test http");
  req.logger.log("debug", "Logger test");
  res.send({ status: 200, message: "Logger test" });
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ error: error.message });
});

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
}); // Inicializa el servidor HTTP y lo hace escuchar en el puerto definido

const io = new Server(httpServer); // Inicializa el servidor de WebSockets

// Manejo de conexiones de WebSockets
io.on("connection", async (socket) => {
  console.log("Cliente conectado con id: ", socket.id);
  registerChatHandler(io, socket); // Llama a la función para manejar el chat

  socket.on("disconnect", () => {
    console.log(`Usuario con ID : ${socket.id} esta desconectado `);
  });
});