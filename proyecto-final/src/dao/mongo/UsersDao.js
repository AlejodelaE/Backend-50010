import userModel from "./models/user.model.js"; // Importa el modelo de usuario desde el archivo user.model.js

// Define y exporta la clase UsersDao para manejar operaciones relacionadas con los usuarios
export default class UsersDao {
  // Método para obtener usuarios basado en ciertos parámetros
  getUsers = (params) => {
    // Utiliza el modelo de usuario para encontrar usuarios que coincidan con los parámetros dados y los convierte a objetos JavaScript
    return userModel.find(params).lean();
  };

  // Método para obtener un usuario basado en ciertos parámetros
  getUserBy = (params) => {
    // Utiliza el modelo de usuario para encontrar un solo usuario que coincida con los parámetros dados y lo convierte a un objeto JavaScript
    return userModel.findOne(params).lean();
  };

  // Método para crear un nuevo usuario
  createUser = async (user) => {
    // Utiliza el modelo de usuario para crear un nuevo usuario con los datos proporcionados
    const result = await userModel.create(user);
    return result.toObject(); // Convierte el resultado a un objeto JavaScript
  };

  // Método para actualizar un usuario basado en su ID
  updateUser = (id, user) => {
    // Utiliza el modelo de usuario para actualizar un usuario identificado por su ID con los nuevos datos
    return userModel.updateOne({ _id: id }, { $set: user });
  };

  // Método para eliminar un usuario basado en su ID
  deleteUser = (id) => {
    // Utiliza el modelo de usuario para desactivar un usuario identificado por su ID (en lugar de eliminarlo físicamente)
    return userModel.updateOne({ _id: id }, { $set: { activate: false } });
  };
}