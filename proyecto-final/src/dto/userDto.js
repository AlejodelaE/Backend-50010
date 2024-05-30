// Define y exporta la clase UserDto
export default class UserDto {
  // Método estático para obtener un DTO de token desde un usuario
  static getTokenDTOFrom = (user) => {
    // Desestructura las propiedades necesarias del objeto user
    const { _id, role, cart, email, firstName, lastName, documents } = user;

    // Verifica si documents está definido y tiene una propiedad 'length' con al menos 5 elementos
    const isPremium = documents && documents.length >= 5;

    // Retorna un objeto con las propiedades necesarias para el token
    return {
      name: `${firstName} ${lastName}`, // Concatena el primer nombre y el apellido
      id: _id, // Asigna el ID del usuario
      role: user.role, // Asigna el rol del usuario
      cart: user.cart, // Asigna el carrito del usuario
      email: user.email, // Asigna el correo del usuario
      isPremium: isPremium, // Asigna el estado premium basado en la longitud de 'documents'
    };
  };
}