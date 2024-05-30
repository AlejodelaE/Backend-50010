import { usersService } from "../services/index.js"; // Importa el servicio de usuarios desde el índice de servicios

// Exporta una función asíncrona llamada updateLastConnection
export const updateLastConnection = async (uid) => {
  // Obtiene el usuario por su ID utilizando el servicio de usuarios
  const user = await usersService.getUserBy({ _id: uid });

  // Actualiza la última conexión del usuario con la fecha y hora actuales en formato ISO
  const result = await usersService.updateUser(uid, {
    last_connection: new Date().toISOString(),
  });

  // Retorna el resultado de la actualización
  return result;
};