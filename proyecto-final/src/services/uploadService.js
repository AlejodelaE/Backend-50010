import multer from "multer"; // Importa el módulo multer para el manejo de cargas de archivos
import __dirname from "../utils.js"; // Importa la utilidad para obtener el directorio actual

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
  // Función para definir el destino de los archivos
  destination: function (req, file, callback) {
    // Verifica el campo del archivo y define el directorio de destino correspondiente
    if (file.fieldname === "image") {
      return callback(null, `${__dirname}/public/img`);
    } else if (file.fieldname === "profile") {
      return callback(null, `${__dirname}/public/profile`);
    } else if (
      file.fieldname === "frontDni" ||
      file.fieldname === "backDni" ||
      file.fieldname === "addressProof" ||
      file.fieldname === "bankStatement"
    ) {
      return callback(null, `${__dirname}/public/documents`);
    } else if (file.fieldname === "product") {
      return callback(null, `${__dirname}/public/products`);
    } else {
      return callback(null, `${__dirname}/public/others`);
    }
  },
  // Función para definir el nombre de los archivos
  filename: function (req, file, callback) {
    // Define el nombre del archivo usando la fecha y hora actual y el nombre original del archivo
    return callback(null, `${Date.now()}-${file.originalname}`);
  },
});

// Crea un middleware de multer utilizando la configuración de almacenamiento
const uploader = multer({ storage });

// Exporta el middleware de multer
export default uploader;