import ticketModel from "./models/ticket.model.js"; // Importa el modelo de ticket desde el archivo ticket.model.js

// Define y exporta la clase TicketsDao para manejar operaciones relacionadas con los tickets
export default class TicketsDao {
  // Método para obtener tickets basado en ciertos parámetros
  getTickets = (params) => {
    // Utiliza el modelo de ticket para encontrar tickets que coincidan con los parámetros dados y los convierte a objetos JavaScript
    return ticketModel.find(params).lean();
  };

  // Método para obtener un ticket basado en ciertos parámetros
  getTicketsBy = (params) => {
    // Utiliza el modelo de ticket para encontrar un solo ticket que coincida con los parámetros dados y lo convierte a un objeto JavaScript
    return ticketModel.findOne(params).lean();
  };

  // Método para crear un nuevo ticket
  createTicket = (ticket) => {
    // Utiliza el modelo de ticket para crear un nuevo ticket con los datos proporcionados
    return ticketModel.create(ticket);
  };

  // Método para actualizar un ticket basado en su ID
  updateTicket = (id, ticket) => {
    // Utiliza el modelo de ticket para actualizar un ticket identificado por su ID con los nuevos datos
    return ticketModel.updateOne({ _id: id }, { $set: ticket });
  };

  // Método para eliminar un ticket basado en su ID
  deleteTicket = (id) => {
    // Utiliza el modelo de ticket para eliminar un ticket identificado por su ID
    return ticketModel.deleteOne({ _id: id });
  };
}