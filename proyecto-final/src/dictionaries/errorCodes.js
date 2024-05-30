let codeCounter = 1; // Inicializa un contador para los códigos de error

// Función para generar un código de error único
export const generateErrorCode = () => {
  const code = `E${codeCounter.toString().padStart(3, "0")}`; // Formatea el código con un prefijo 'E' y lo rellena con ceros a la izquierda hasta tener 3 dígitos
  codeCounter += 1; // Incrementa el contador para el próximo código de error
  return code; // Retorna el código generado
};

// Objeto que contiene los códigos de error
export const errorCodes = {
  ValidationError: generateErrorCode(), // Genera y asigna un código de error único para errores de validación
};