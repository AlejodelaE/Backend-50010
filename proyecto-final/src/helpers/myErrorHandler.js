import fs from "fs"; // Importa el módulo de sistema de archivos de Node.js
import path from "path"; // Importa el módulo de rutas de Node.js
import { generateErrorCode } from "../dictionaries/errorCodes.js"; // Importa la función para generar códigos de error
import ErrorsDictionary from "../dictionaries/errors.js"; // Importa el diccionario de errores
import { errorCodes } from "../dictionaries/errorCodes.js"; // Importa los códigos de error
import __dirname from "../utils.js"; // Importa la ruta del directorio actual desde utils.js

// Clase MyCustomError para manejar y registrar errores personalizados
class MyCustomError {
  constructor(filePath) {
    this.path = path.join(__dirname, filePath); // Define la ruta del archivo donde se almacenarán los errores
  }

  // Método para agregar un nuevo error al archivo de errores
  addError(error) {
    const newError = {
      name: error.name, // Nombre del error
      message: error.message, // Mensaje del error
      stack: error.stack, // Pila de llamadas del error
      code: errorCodes[error.name] || generateErrorCode(), // Código de error
      timestamp: new Date().toISOString(), // Marca de tiempo del error
    };

    try {
      const errors = fs.existsSync(this.path)
        ? JSON.parse(fs.readFileSync(this.path)) // Lee los errores existentes del archivo si existe
        : [];

      errors.push(newError); // Agrega el nuevo error a la lista de errores
      fs.writeFileSync(this.path, JSON.stringify(errors, null, 2)); // Escribe los errores actualizados en el archivo
    } catch (writeError) {
      console.error("Error writing error to file:", writeError); // Muestra un mensaje de error en la consola si hay un problema al escribir en el archivo
    }
  }
}

// Función manejadora de errores
const myErrorHandler = (error, next) => {
  const knownError = ErrorsDictionary[error.name]; // Busca el error en el diccionario de errores

  if (knownError) {
    const customError = new Error(error.message); // Crea un nuevo objeto de error
    customError.name = knownError; // Asigna el nombre del error conocido
    customError.code = errorCodes[knownError]; // Asigna el código del error conocido
    next(customError); // Llama a la siguiente función de middleware con el error personalizado
  } else {
    const customErrorInstance = new MyCustomError("../src/helpers/errors.json"); // Crea una instancia de MyCustomError
    customErrorInstance.addError(error); // Agrega el error al archivo de errores

    console.error("Unknown error occurred. Check errors.json for details."); // Muestra un mensaje de error en la consola

    next(error); // Llama a la siguiente función de middleware con el error original
  }
};

export default myErrorHandler; // Exporta la función manejadora de errores como el valor por defecto del módulo