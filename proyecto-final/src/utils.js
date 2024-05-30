import { fileURLToPath } from "url"; // Importa la función fileURLToPath del módulo url
import { dirname } from "path"; // Importa la función dirname del módulo path

// Obtiene el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtiene el directorio del archivo actual
const __dirname = dirname(__filename);

// Función para obtener filtros válidos basados en el tipo de documento
export const getValidFilters = (filters, documentType) => {
  const cleanFilter = {}; // Inicializa un objeto para almacenar los filtros válidos

  // Evalúa el tipo de documento y aplica los filtros correspondientes
  switch (documentType) {
    case "product": {
      // Si el filtro contiene categoría, la añade al filtro limpio
      if (filters.category) {
        if (typeof filters.category === "string") {
          cleanFilter["category"] = { $in: [filters.category] }; // Convierte la categoría en un array si es un string
        } else {
          cleanFilter["category"] = { $in: filters.category }; // Utiliza la categoría directamente si ya es un array
        }
      }
      // Si el filtro contiene un precio mínimo, lo añade al filtro limpio
      if (filters.gte) {
        cleanFilter["price"] = { $gte: filters.gte }; // Añade el filtro de precio mínimo
      }
      // Si el filtro contiene un precio específico, lo añade al filtro limpio
      if (filters.price) {
        cleanFilter["price"] = filters.price; // Añade el filtro de precio específico
      }
      return cleanFilter; // Retorna el objeto con los filtros válidos
    }
  }
};

// Exporta la constante __dirname
export default __dirname;