import fs from "fs"; // Importa el módulo de sistema de archivos de Node.js

// Define y exporta la clase ProductsDao para manejar operaciones relacionadas con los productos
export default class ProductsDao {
  constructor(path) {
    this.path = path; // Inicializa la propiedad path con la ruta del archivo donde se almacenan los datos de los productos
  }

  // Método para agregar un nuevo producto
  addProduct = async (product) => {
    try {
      const products = await this.getProducts(); // Obtiene todos los productos
      const {
        title,
        description,
        category,
        code,
        stock,
        price,
        thumbnail = [],
        status = true,
      } = product; // Desestructura el producto
      const codeRepeat = products.find((p) => p.code === product.code); // Verifica si el código del producto ya existe

      if (
        !title ||
        !description ||
        !category ||
        !code ||
        !stock ||
        !price ||
        !thumbnail
      ) {
        return "Complete all fields"; // Verifica que todos los campos estén completos
      }
      if (codeRepeat) {
        return "The insert code already exists"; // Retorna un mensaje si el código ya existe
      }
      let id;
      if (products.length === 0) {
        id = 1; // Si no hay productos, asigna el id 1
      } else {
        id = products[products.length - 1].id + 1; // Asigna un id incrementado
      }

      products.push({ ...product, id }); // Agrega el nuevo producto al array de productos

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      ); // Escribe el array actualizado en el archivo
      return product; // Retorna el nuevo producto
    } catch (error) {
      console.log(error); // Muestra el error en la consola
    }
  };

  // Método para obtener todos los productos
  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) { // Verifica si el archivo existe
        const data = await fs.promises.readFile(this.path, "utf-8"); // Lee el archivo
        const parseData = JSON.parse(data); // Parsea los datos leídos
        return parseData; // Retorna los productos
      } else {
        return []; // Si el archivo no existe, retorna un array vacío
      }
    } catch (error) {
      console.log(error); // Muestra el error en la consola
    }
  };

  // Método para obtener un producto por id
  getProductsById = async (id) => {
    try {
      let results = await this.getProducts(); // Obtiene todos los productos
      let product = results.find((p) => p.id === id); // Encuentra el producto por id

      if (product) {
        return product; // Retorna el producto encontrado
      } else {
        return "Not Found"; // Retorna "Not Found" si no encuentra el producto
      }
    } catch (error) {
      console.log(error); // Muestra el error en la consola
    }
  };

  // Método para actualizar un producto
  updateProduct = async (id, updatedProduct) => {
    try {
      const products = await this.getProducts(); // Obtiene todos los productos
      const indexOfProduct = products.findIndex((p) => p.id === id); // Encuentra el índice del producto por id
      if (indexOfProduct === -1) {
        return `Can't find product with id : ${id}`; // Retorna un mensaje de error si no encuentra el producto
      }

      products[indexOfProduct] = {
        ...products[indexOfProduct],
        ...updatedProduct,
      }; // Actualiza el producto

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      ); // Escribe el array actualizado en el archivo
      return products[indexOfProduct]; // Retorna el producto actualizado
    } catch (error) {
      console.log(error); // Muestra el error en la consola
    }
  };

  // Método para eliminar un producto
  deleteProduct = async (id) => {
    try {
      const products = await this.getProducts(); // Obtiene todos los productos
      const index = products.findIndex((p) => p.id === parseInt(id)); // Encuentra el índice del producto por id

      if (index < 0) {
        return `Can't find product with id : ${id}`; // Retorna un mensaje de error si no encuentra el producto
      }
      products.splice(index, 1); // Elimina el producto del array

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      ); // Escribe el array actualizado en el archivo

      return products; // Retorna el array de productos actualizado
    } catch (error) {
      console.log(error); // Muestra el error en la consola
    }
  };
}