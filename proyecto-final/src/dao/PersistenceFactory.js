import config from "../config/config.js"; // Importa la configuración desde config.js

// Define y exporta la clase PersistenceFactory para manejar la creación de DAOs de persistencia
export default class PersistenceFactory {
  // Método estático para obtener la persistencia basada en la configuración
  static getPersistence = async () => {
    // Lista de las ENTIDADES que necesito modelar a nivel persistencia.
    let UsersDao; // Variable para el DAO de usuarios
    let CartsDao; // Variable para el DAO de carritos
    let ProductsDao; // Variable para el DAO de productos
    let TicketsDao; // Variable para el DAO de tickets

    // Switch para determinar el tipo de persistencia basado en la configuración
    switch (config.app.PERSISTENCE) {
      case "MEMORY": {
        // Importa los DAOs de memoria
        UsersDao = (await import("./memory/UsersDao.js")).default;
        CartsDao = (await import("./memory/CartsDao.js")).default;
        ProductsDao = (await import("./memory/ProductsDao.js")).default;
        TicketsDao = (await import("./memory/TicketsDao.js")).default;
        break;
      }
      case "FS": {
        // Importa los DAOs del sistema de archivos (file system)
        UsersDao = (await import("./FS/UsersDao.js")).default;
        CartsDao = (await import("./FS/CartsDao.js")).default;
        ProductsDao = (await import("./FS/ProductsDao.js")).default;
        TicketsDao = (await import("./FS/TicketsDao.js")).default;
        break;
      }
      case "MONGO": {
        // Importa los DAOs de MongoDB
        UsersDao = (await import("./mongo/UsersDao.js")).default;
        CartsDao = (await import("./mongo/CartsDao.js")).default;
        ProductsDao = (await import("./mongo/ProductsDao.js")).default;
        TicketsDao = (await import("./mongo/TicketsDao.js")).default;
        break;
      }
    }
    // Retorna un objeto con los DAOs importados
    return {
      UsersDao,
      CartsDao,
      ProductsDao,
      TicketsDao,
    };
  };
}