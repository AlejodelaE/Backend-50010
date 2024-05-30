import mongoose from "mongoose"; // Importa mongoose para trabajar con la base de datos MongoDB

const collection = "users"; // Define el nombre de la colección en MongoDB

// Define el esquema para los usuarios
const schema = new mongoose.Schema(
  {
    firstName: {
      type: String, // Define el tipo de dato como String
      required: true, // Indica que este campo es obligatorio
    },
    lastName: {
      type: String, // Define el tipo de dato como String
      required: true, // Indica que este campo es obligatorio
    },
    email: {
      type: String, // Define el tipo de dato como String
      required: true, // Indica que este campo es obligatorio
      unique: true, // Indica que este campo debe ser único
    },
    password: {
      type: String, // Define el tipo de dato como String
    },
    role: {
      type: String, // Define el tipo de dato como String
      enum: ["admin", "user", "premium"], // Limita los valores posibles a "admin", "user", o "premium"
      default: "user", // Establece el valor por defecto como "user"
    },
    cart: {
      type: mongoose.SchemaTypes.ObjectId, // Define el tipo de dato como ObjectId, que referencia a la colección de carritos
      ref: "carts", // Referencia a la colección "carts"
    },
    active: {
      type: Boolean, // Define el tipo de dato como Boolean
      default: true, // Establece el valor por defecto como true
    },
    documents: {
      type: Array, // Define el tipo de dato como Array
      default: [{ name: "", reference: "" }], // Establece el valor por defecto como un array con un objeto vacío
    },
    last_connection: {
      type: Date, // Define el tipo de dato como Date
      default: new Date().toISOString(), // Establece el valor por defecto como la fecha y hora actuales en formato ISO
    },
  },
  {
    timestamps: true, // Añade campos de timestamp (createdAt y updatedAt)
  }
);

// Crea el modelo de usuario usando el esquema definido
const userModel = mongoose.model(collection, schema);

export default userModel; // Exporta el modelo de usuario