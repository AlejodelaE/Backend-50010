// Selecciona el contenedor de productos del carrito y el botón de compra en el DOM
const products = document.getElementById("cartContainer");
const comprar = document.getElementById("purchaseBtn");

// Función asíncrona para obtener los detalles del carrito
const response = async () => {
  const cart = getCookie("cart"); // Obtiene la cookie del carrito
  if (cart) {
    const response = await fetch(`/api/carts/${cid}`, { method: "GET" }); // Realiza una solicitud para obtener el carrito por ID
    const result = await response.json();
  } else {
    // Si no se encontró la cookie, asume que el usuario está logueado
    const response = await fetch(`/api/sessions/current`, { method: "GET" }); // Realiza una solicitud para obtener la sesión actual
    const result = await response.json();
    const user = result.payload.email;
    const idCart = result.payload.cart;
    const cartID = await fetch(`/api/carts/${idCart}`, { method: "GET" }); // Realiza una solicitud para obtener el carrito por ID
    const resultCart = await cartID.json();
    const productsInCart = resultCart.payload.products;
    let total = 0;

    // Itera sobre los productos en el carrito y los agrega al contenedor en el DOM
    productsInCart.forEach((product) => {
      products.innerHTML += ` <td>${product.product.title}</td>
                              <td>${product.product.description}</td>
                              <td>${product.product.category}</td>
                              <td>$ ${product.product.price}</td>
                              <td>${product.product.stock}</td>
                              <td>${product.quantity}</td>
                              <td>$ ${
                                product.product.price * product.quantity
                              }</td>
                              
      `;
    });

    // Calcula el total de la compra
    productsInCart.forEach((product) => {
      total += product.product.price * product.quantity;
    });
    const amount = total.toFixed(2);
    
    // Agrega el total al contenedor en el DOM
    products.innerHTML += `
    <td></td><td></td><td></td><td></td><td></td><td><strong>Total</strong></td>
    <td><strong>$ ${amount}</strong></td>
    `;
  }
};

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Llama a la función `response` al cargar el script
response();

// Agrega un evento al botón de compra para verificar si el usuario está logueado
comprar.addEventListener("click", () => {
  const cart = getCookie("cart");
  if (cart) {
    // Si el usuario no está logueado, muestra una alerta
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Por favor, inicia sesión para realizar la compra",
      footer: '<a href="/">Registrate o inicia sesión</a>',
    });
  }
});