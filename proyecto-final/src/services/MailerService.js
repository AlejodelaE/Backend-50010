import nodemailer from "nodemailer"; // Importa el módulo nodemailer para el envío de correos electrónicos
import config from "../config/config.js"; // Importa la configuración de la aplicación
import DMailInfo from "../constants/DMailInfo.js"; // Importa la información de los correos electrónicos desde constantes
import Handlebars from "handlebars"; // Importa el módulo Handlebars para la generación de plantillas de correo electrónico
import fs from "fs"; // Importa el módulo fs para trabajar con el sistema de archivos
import __dirname from "../utils.js"; // Importa la utilidad para obtener el directorio actual

// Define y exporta la clase MailerService
export default class MailerService {
  // Constructor de la clase
  constructor() {
    // Crea un cliente de nodemailer utilizando la configuración de Gmail
    this.client = nodemailer.createTransport({
      service: "gmail",
      port: 587, // Puerto para el servicio de correo
      auth: {
        user: config.mailer.USER, // Usuario de autenticación (correo electrónico)
        pass: config.mailer.PASS, // Contraseña de autenticación
      },
    });
  }

  // Método para enviar correos electrónicos
  sendMail = async (emails, template, payload) => {
    const mailInfo = DMailInfo[template]; // Obtiene la información del correo desde DMailInfo
    const html = await this.generateMailTemplate(template, payload); // Genera el contenido HTML del correo
    const result = await this.client.sendMail({
      from: "Kinetoscope <electrohouse136@gmail.com>", // Remitente del correo
      to: emails, // Destinatarios del correo
      html, // Contenido HTML del correo
      ...mailInfo, // Información adicional del correo
    });
    return result; // Retorna el resultado del envío
  };

  // Método para generar la plantilla del correo electrónico
  generateMailTemplate = async (template, payload) => {
    const content = await fs.promises.readFile(
      `${__dirname}/templates/${template}.handlebars`, // Ruta de la plantilla de correo
      "utf-8" // Codificación de la plantilla
    );
    const preCompiledContent = Handlebars.compile(content); // Compila la plantilla con Handlebars
    const finalContent = preCompiledContent(payload); // Genera el contenido final de la plantilla con los datos proporcionados
    return finalContent; // Retorna el contenido final
  };
}