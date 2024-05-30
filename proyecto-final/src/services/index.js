import CartsRepository from "./repositories/CartsRepository.js"; // Importa la clase CartsRepository
import ProductsRepository from "./repositories/ProductsRepository.js"; // Importa la clase ProductsRepository
import UsersRepository from "./repositories/UsersRepository.js"; // Importa la clase UsersRepository
import TicketRepository from "./repositories/TicketsRepository.js"; // Importa la clase TicketsRepository

import PersistenceFactory from "../dao/PersistenceFactory.js"; // Importa la clase PersistenceFactory

// Obtiene los DAOs de la fábrica de persistencia
const { CartsDao, ProductsDao, TicketsDao, UsersDao, ChatDao } = await PersistenceFactory.getPersistence();

// Crea instancias de los servicios utilizando los DAOs correspondientes
export const cartsService = new CartsRepository(new CartsDao()); // Servicio de carritos
export const productsService = new ProductsRepository(new ProductsDao()); // Servicio de productos
export const ticketsService = new TicketRepository(new TicketsDao()); // Servicio de tickets
export const usersService = new UsersRepository(new UsersDao()); // Servicio de usuarios