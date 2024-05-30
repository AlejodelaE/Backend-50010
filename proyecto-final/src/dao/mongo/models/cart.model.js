import mongoose from "mongoose"; // Importa mongoose para trabajar con la base de datos MongoDB

const collection = "carts"; // Define el nombre de la colección en MongoDB

// Define un subesquema para los productos en el carrito
const productSubSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.SchemaTypes.ObjectId, // Define el tipo de dato como ObjectId, que referencia a la colección de productos
      ref: "products", // Referencia a la colección "products"
    },
    quantity: {
      type: Number, // Define el tipo de dato como Number
      default: 1, // Establece el valor por defecto como 1
    },
  },
  { _id: false } // Evita la creación de un ID para este subdocumento
);

// Define el esquema para el carrito
const schema = new mongoose.Schema(
  {
    products: {
      type: [productSubSchema], // Define un array de subesquemas de productos
      default: [], // Establece el valor por defecto como un array vacío
    },
  },
  { timestamps: true } // Añade campos de timestamp (createdAt y updatedAt)
);

// Middleware pre-query para popular los productos referenciados
schema.pre(["find", "findOne"], function () {
  this.populate("products.product"); // Popula los productos referenciados antes de ejecutar una consulta "find" o "findOne"
});

// Crea el modelo de carrito usando el esquema definido
const cartModel = mongoose.model(collection, schema);

export default cartModel; // Exporta el modelo de carrito