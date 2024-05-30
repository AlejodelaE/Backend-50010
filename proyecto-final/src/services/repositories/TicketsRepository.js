// Define y exporta la clase TicketsRepository
export default class TicketsRepository {
  // Constructor de la clase, recibe un objeto dao (data access object)
  constructor(dao) {
    this.dao = dao; // Asigna el dao al atributo de la clase
  }

  // Método para obtener tickets basado en ciertos parámetros
  getTickets = (params) => {
    return this.dao.getTickets(params); // Llama al método getTickets del dao con los parámetros dados
  };

  // Método para obtener tickets basado en ciertos parámetros con opción de populación
  getTicketsBy = (params) => {
    return this.dao.getTicketsBy(params, { populate: true }); // Llama al método getTicketsBy del dao con los parámetros dados y la opción de populación
  };

  // Método para crear un nuevo ticket
  createTicket = (ticket) => {
    return this.dao.createTicket(ticket); // Llama al método createTicket del dao con el ticket dado
  };

  // Método para actualizar un ticket por su ID
  updateTicket = (id, ticket) => {
    return this.dao.updateTicket(id, ticket); // Llama al método updateTicket del dao con el ID del ticket y los datos del ticket dados
  };

  // Método para eliminar un ticket por su ID
  deleteTicket = (id) => {
    return this.dao.deleteTicket(id); // Llama al método deleteTicket del dao con el ID del ticket dado
  };
}
