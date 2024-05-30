import fs from "fs"; // Importa el módulo de sistema de archivos de Node.js

// Define y exporta la clase CartsDao
export default class CartsDao {
  constructor(path) {
    this.path = path; // Inicializa la propiedad path con la ruta al archivo donde se guardan los datos de los carritos
    this.carts = []; // Inicializa la propiedad carts como un array vacío
  }

  // Método para obtener todos los carritos
  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) { // Verifica si el archivo existe
        const cartData = await fs.promises.readFile(this.path, "utf-8"); // Lee el archivo de manera asíncrona
        const carts = JSON.parse(cartData); // Parse el contenido del archivo como JSON
        return carts; // Retorna los carritos
      } else {
        return []; // Si el archivo no existe, retorna un array vacío
      }
    } catch (error) {
      console.error(error); // Muestra cualquier error en la consola
    }
  };

  // Método para crear un nuevo carrito
  createCart = async () => {
    try {
      const carts = await this.getCarts(); // Obtiene todos los carritos
      let id;
      if (carts.length === 0) {
        id = 1; // Si no hay carritos, establece el ID en 1
      } else {
        id = carts[carts.length - 1].id + 1; // Si hay carritos, establece el ID en el último ID más 1
      }
      const cart = {
        id: id, // Establece el ID del carrito
        products: [], // Inicializa el array de productos vacío
      };
      carts.push(cart); // Añade el nuevo carrito al array de carritos
      await fs.promises.writeFile(this.path, JSON.stringify(carts)); // Escribe los carritos actualizados en el archivo
      return cart; // Retorna el nuevo carrito
    } catch (error) {
      console.error(error); // Muestra cualquier error en la consola
    }
  };

  // Método para añadir un producto a un carrito
  addProductToCart = async (cid, pid) => {
    try {
      const carts = await this.getCarts(); // Obtiene todos los carritos
      const cart = carts.find((cart) => cart.id === cid); // Encuentra el carrito con el ID especificado

      if (cart) {
        const productExists = cart.products.some(
          (product) => product.pid === pid
        ); // Verifica si el producto ya existe en el carrito

        if (productExists) {
          cart.products.find((product) => product.pid === pid).quantity++; // Incrementa la cantidad del producto si ya existe
        } else {
          cart.products.push({
            pid: pid, // Añade el producto al carrito con cantidad 1 si no existe
            quantity: 1,
          });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2)); // Escribe los carritos actualizados en el archivo
      }
    } catch (error) {
      console.log(error); // Muestra cualquier error en la consola
    }
  };

  // Método para obtener un carrito por su ID
  getCartById = async (id) => {
    try {
      const carts = await this.getCarts(); // Obtiene todos los carritos
      const foundCart = carts.find((cart) => cart.id === id); // Encuentra el carrito con el ID especificado

      if (foundCart) {
        return foundCart; // Retorna el carrito encontrado
      } else {
        return "Not Found"; // Retorna "Not Found" si el carrito no existe
      }
    } catch (error) {
      console.error(error); // Muestra cualquier error en la consola
    }
  };

  // Método para actualizar un carrito
  updateCart = async (cid, updatedCart) => {
    try {
      const carts = await this.getCarts(); // Obtiene todos los carritos
      const cartIndex = carts.findIndex((cart) => cart.id === cid); // Encuentra el índice del carrito con el ID especificado
      if (cartIndex === -1) {
        return `Can't find cart with id: `; // Retorna un mensaje de error si el carrito no existe
      }
      carts[cartIndex] = {
        ...carts[cartIndex], // Mantiene las propiedades existentes del carrito
        ...updatedCart, // Sobrescribe con las propiedades del carrito actualizado
      };
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t")); // Escribe los carritos actualizados en el archivo
      return carts[cartIndex]; // Retorna el carrito actualizado
    } catch (error) {
      console.error(error); // Muestra cualquier error en la consola
    }
  };

  // Método para eliminar un carrito
  deleteCart = async (id) => {
    try {
      const carts = await this.getCarts(); // Obtiene todos los carritos
      const index = carts.findIndex((cart) => cart.id === id); // Encuentra el índice del carrito con el ID especificado
      if (index === -1) {
        return `Can't find cart with id: `; // Retorna un mensaje de error si el carrito no existe
      }
      carts.splice(index, 1); // Elimina el carrito del array
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t")); // Escribe los carritos actualizados en el archivo
      return carts; // Retorna el array de carritos actualizado
    } catch (error) {
      console.error(error); // Muestra cualquier error en la consola
    }
  };
}