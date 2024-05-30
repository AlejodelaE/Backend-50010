import bcrypt from "bcrypt"; // Importa el módulo bcrypt para manejar el hashing de contraseñas

// Función asíncrona para crear un hash de una contraseña
const createHash = async (password) => {
  const salts = await bcrypt.genSalt(10); // Genera un salt con un factor de costo de 10
  return bcrypt.hash(password, salts); // Crea un hash de la contraseña usando el salt generado
};

// Función asíncrona para validar una contraseña comparándola con un hash
const validatePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword); // Compara la contraseña dada con el hash almacenado
};

// Función para extraer el token de autenticación de las cookies de la solicitud
const extractAuthToken = (req) => {
  let token = null; // Inicializa el token como null
  if (req.cookies) { // Verifica si hay cookies en la solicitud
    token = req.cookies["authCookie"]; // Extrae el token de autenticación de la cookie "authCookie"
  }
  return token; // Retorna el token extraído
};

// Exporta las funciones como un objeto
export default {
  createHash, // Exporta la función createHash
  extractAuthToken, // Exporta la función extractAuthToken
  validatePassword, // Exporta la función validatePassword
};