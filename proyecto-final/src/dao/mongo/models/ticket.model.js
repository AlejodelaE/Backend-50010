import mongoose from "mongoose"; // Importa mongoose para trabajar con la base de datos MongoDB

const collection = "tickets"; // Define el nombre de la colección en MongoDB

// Define el esquema para los tickets
const schema = new mongoose.Schema(
  {
    code: {
      type: String, // Define el tipo de dato como String
      required: true, // Indica que este campo es obligatorio
      unique: true, // Indica que este campo debe ser único
    },
    purchase_datetime: {
      type: Date, // Define el tipo de dato como Date
      required: true, // Indica que este campo es obligatorio
      default: new Date().toISOString(), // Establece el valor por defecto como la fecha y hora actuales en formato ISO
    },
    amount: {
      type: Number, // Define el tipo de dato como Number
      required: true, // Indica que este campo es obligatorio
    },
    purchaser: {
      type: String, // Define el tipo de dato como String
      required: true, // Indica que este campo es obligatorio
    },
    products: {
      type: Array, // Define el tipo de dato como Array
      default: [], // Establece el valor por defecto como un array vacío
    },
    active: {
      type: Boolean, // Define el tipo de dato como Boolean
      default: true, // Establece el valor por defecto como true
    },
  },
  {
    timestamps: true, // Añade campos de timestamp (createdAt y updatedAt)
  }
);

// Crea el modelo de ticket usando el esquema definido
const ticketModel = mongoose.model(collection, schema);

export default ticketModel; // Exporta el modelo de ticket