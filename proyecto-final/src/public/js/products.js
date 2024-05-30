// Función asíncrona para agregar un producto al carrito
async function addProduct(id) {
  const cart = getCookie("cart"); // Obtiene la cookie del carrito

  if (cart) {
    // Si existe la cookie del carrito
    const response = await fetch(`/api/carts/${cart}/products/${id}`, {
      method: "PUT", // Método HTTP PUT para actualizar el carrito
    });
    const result = await response.json(); // Obtiene la respuesta en formato JSON
  } else {
    // Si no encontró la cookie, es porque ya hay un usuario logueado
    const response = await fetch(`/api/carts/products/${id}`, {
      method: "PUT", // Método HTTP PUT para actualizar el carrito
    });
    const result = await response.json(); // Obtiene la respuesta en formato JSON
  }

  // Muestra una notificación indicando que el producto se ha agregado al carrito
  Toastify({
    text: "Producto agregado al carrito",
    duration: 3000, // Duración de la notificación en milisegundos
  }).showToast();
}

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
  const value = `; ${document.cookie}`; // Obtiene todas las cookies del documento
  const parts = value.split(`; ${name}=`); // Divide las cookies para encontrar la deseada
  if (parts.length === 2) return parts.pop().split(";").shift(); // Retorna el valor de la cookie si se encuentra
}

// Selección de todos los botones para agregar productos
const btnAddProduct = document.querySelectorAll(".btnAddProduct");

// Comentado el evento de click para los botones de agregar producto
// btnAddProduct.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(e.target.id);
// });
