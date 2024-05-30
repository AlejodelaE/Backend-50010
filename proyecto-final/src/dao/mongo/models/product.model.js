import mongoose from "mongoose"; // Importa mongoose para trabajar con la base de datos MongoDB
import mongoosePaginate from "mongoose-paginate-v2"; // Importa el plugin mongoose-paginate-v2 para paginación

const collection = "products"; // Define el nombre de la colección en MongoDB

// Define el esquema para los productos
const schema = new mongoose.Schema(
  {
    title: {
      type: String, // Define el tipo de dato como String
      required: true, // Indica que este campo es obligatorio
    },
    description: {
      type: String, // Define el tipo de dato como String
      required: true, // Indica que este campo es obligatorio
    },
    category: {
      type: String, // Define el tipo de dato como String
      required: true, // Indica que este campo es obligatorio
    },
    code: {
      type: String, // Define el tipo de dato como String
      required: true, // Indica que este campo es obligatorio
      unique: true, // Indica que este campo debe ser único
    },
    stock: {
      type: Number, // Define el tipo de dato como Number
      required: true, // Indica que este campo es obligatorio
    },
    price: {
      type: Number, // Define el tipo de dato como Number
      required: true, // Indica que este campo es obligatorio
    },
    thumbnail: {
      type: Array, // Define el tipo de dato como Array
      default: [], // Establece el valor por defecto como un array vacío
    },
    status: {
      type: Boolean, // Define el tipo de dato como Boolean
      default: true, // Establece el valor por defecto como true
      index: true, // Crea un índice en este campo para mejorar la eficiencia de las consultas
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId, // Define el tipo de dato como ObjectId, que referencia a la colección de usuarios
      ref: "users", // Referencia a la colección "users"
      default: "admin", // Establece el valor por defecto como "admin"
    },
  },
  { timestamps: true } // Añade campos de timestamp (createdAt y updatedAt)
);

// Aplica el plugin de paginación al esquema
schema.plugin(mongoosePaginate);

// Crea el modelo de producto usando el esquema definido
const productModel = mongoose.model(collection, schema);

export default productModel; // Exporta el modelo de producto