// Conexión al servidor de sockets
const socketClient = io(); // Inicializa la conexión con el servidor de sockets

// Escucha el evento 'sendProducts' y actualiza la lista de productos
socketClient.on("sendProducts", (listProducts) => {
  updateProductList(listProducts); // Llama a la función para actualizar la lista de productos
});

// Función para actualizar la lista de productos en el DOM
function updateProductList(listProducts) {
  const div = document.getElementById("container"); // Selecciona el contenedor de productos

  let productos = listProducts; // Almacena la lista de productos recibidos
  let products = ""; // Inicializa una cadena vacía para almacenar el HTML de los productos
  div.innerHTML = ""; // Limpia el contenido del contenedor

  // Itera sobre la lista de productos y genera el HTML para cada producto
  productos.forEach((product) => {
    products += `<div class="card" id="card${product.id}">
                    <div class="card-body">
                      <img src="${product.thumbnail}" width="150"class="card-img-top" alt="${product.title}"/>
                      <h5 class="card-title">${product.title}</h5>
                      <div class="card-info">
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Categoría:${product.category}</p>
                        <p class="card-text">Código:${product.code}</p>
                        <p class="card-text">Stock:${product.stock}</p>
                        <p class="card-text">Precio: $${product.price}</p>
                      </div>
                    </div>
                 </div>`;
  });

  div.innerHTML = products; // Actualiza el contenido del contenedor con el HTML generado
}

// Selección del formulario de productos
const form = document.getElementById("formProducts");

// Evento de envío del formulario de productos
form.addEventListener("submit", (evt) => {
  evt.preventDefault(); // Previene el comportamiento predeterminado del formulario

  // Obtiene los valores de los campos del formulario
  let title = form.elements.title.value;
  let description = form.elements.description.value;
  let stock = form.elements.stock.value;
  let thumbnail = form.elements.thumbnail.value;
  let category = form.elements.category.value;
  let price = form.elements.price.value;
  let code = form.elements.code.value;

  // Emite un evento 'addProduct' con los datos del nuevo producto
  socketClient.emit("addProduct", {
    title,
    description,
    stock,
    thumbnail,
    category,
    price,
    code,
  });

  form.reset(); // Resetea el formulario
});

// Selección del botón de eliminar producto
document.getElementById("delete-btn").addEventListener("click", (e) => {
  const deleteIdInput = document.getElementById("pid"); // Selecciona el campo de entrada del ID del producto a eliminar
  const deleteId = parseInt(deleteIdInput.value); // Convierte el valor del campo de entrada a un número entero

  // Emite un evento 'deleteProduct' con el ID del producto a eliminar
  socketClient.emit("deleteProduct", deleteId);

  deleteIdInput.value = ""; // Limpia el campo de entrada del ID

  // Muestra una notificación de éxito
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Producto eliminado",
    showConfirmButton: false,
    timer: 1500,
  });
});