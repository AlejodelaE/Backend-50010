// Define y exporta la clase UsersRepository
export default class UsersRepository {
  // Constructor de la clase, recibe un objeto dao (data access object)
  constructor(dao) {
    this.dao = dao; // Asigna el dao al atributo de la clase
  }

  // Método para obtener usuarios basado en ciertos parámetros
  getUsers = (params) => {
    return this.dao.getUsers(params); // Llama al método getUsers del dao con los parámetros dados
  };

  // Método para obtener un usuario basado en ciertos parámetros
  getUserBy = (params) => {
    return this.dao.getUserBy(params); // Llama al método getUserBy del dao con los parámetros dados
  };

  // Método para crear un nuevo usuario
  createUser = (user) => {
    return this.dao.createUser(user); // Llama al método createUser del dao con el usuario dado
  };

  // Método para actualizar un usuario por su ID
  updateUser = (id, user) => {
    return this.dao.updateUser(id, user); // Llama al método updateUser del dao con el ID del usuario y los datos del usuario dados
  };

  // Método para eliminar un usuario por su ID
  deleteUser = (id) => {
    return this.dao.deleteUser(id); // Llama al método deleteUser del dao con el ID del usuario dado
  };
}