import __dirname from "../utils.js"; // Importa __dirname desde utils.js para obtener la ruta del directorio actual

// Exporta un objeto con configuraciones de email para diferentes situaciones
export default {
  // Configuración para emails de bienvenida
  welcome: {
    subject: "¡Bienvenido!", // Asunto del email de bienvenida
    attachments: [
      {
        filename: "logo.png", // Nombre del archivo adjunto
        path: `${__dirname}/public/img/logo.png`, // Ruta al archivo adjunto
        cid: "logo", // Identificador único para el archivo adjunto
      },
    ],
  },
  // Configuración para emails de restablecimiento de contraseña
  restorePwd: {
    subject: "Restablecer contraseña", // Asunto del email de restablecimiento de contraseña
    attachments: [
      {
        filename: "logo.png", // Nombre del archivo adjunto
        path: `${__dirname}/public/img/logo.png`, // Ruta al archivo adjunto
        cid: "logo", // Identificador único para el archivo adjunto
      },
    ],
  },
  // Configuración para emails de confirmación de compra
  purchase: {
    subject: "Gracias por tu compra", // Asunto del email de confirmación de compra
    attachments: [
      {
        filename: "logo.png", // Nombre del archivo adjunto
        path: `${__dirname}/public/img/logo.png`, // Ruta al archivo adjunto
        cid: "logo", // Identificador único para el archivo adjunto
      },
    ],
  },
};
