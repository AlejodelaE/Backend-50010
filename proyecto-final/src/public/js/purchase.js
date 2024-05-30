// Selección de elementos del DOM
const ticket = document.getElementById("ticket"); // Selecciona el elemento del ticket
const finish = document.getElementById("finish"); // Selecciona el botón de finalizar compra

// Función asíncrona para obtener y mostrar el ticket de compra
const ticketResponse = async () => {
  // Obtiene la información del usuario actual
  const user = await fetch("/api/sessions/current", {
    method: "GET", // Método HTTP GET para obtener la sesión actual
  }).then((response) => response.json());

  const idCart = user.payload.cart; // Obtiene el ID del carrito del usuario

  // Realiza una solicitud para obtener el ticket de compra del carrito
  const response = await fetch(`/api/carts/${idCart}/purchase`, {
    method: "GET", // Método HTTP GET para obtener el ticket de compra
  }).then((response) => response.json());

  const data = response.payload; // Obtiene los datos del ticket de la respuesta

  // Si hay datos en el ticket, los muestra en el elemento del ticket
  if (data) {
    ticket.innerHTML = `<h4>Ticket: ${data.code}</h4>
                        <p>Usuario: ${user.payload.name}</p>
                        <p>Email: ${data.purchaser}</p>
                        <p>Fecha: ${data.purchase_datetime}</p>
                        <p>Productos:</p>
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Nombre</th>
                              <th scope="col">Precio unitario</th>
                              <th scope="col">Cantidad</th>
                              <th scope="col">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${data.products
                              .map((product) => {
                                return `<tr>
                                          <td>${product.product.title}</td>
                                          <td>$ ${product.product.price}</td>
                                          <td>${product.quantity}</td>
                                          <td>$ ${
                                            product.quantity * product.product.price
                                          }</td>
                                        </tr>`;
                              })
                              .join("")}
                            <tr>
                              <td></td><td></td><td><strong>Total</strong></td><td><strong>$ ${
                                data.amount
                              }</strong></td>
                            </tr>
                          </tbody>
                        </table>`;
  }

  // Agrega un evento de click al botón de finalizar compra
  finish.addEventListener("click", async () => {
    Swal.fire({
      icon: "success",
      title: "Gracias por tu compra!",
      text: "Se envió un correo con los detalles de su compra.",
      confirmButtonText: "Ok",
    }).then(async () => {
      // Elimina el carrito después de la compra
      const deleteCart = await fetch(`/api/carts/${idCart}`, {
        method: "DELETE", // Método HTTP DELETE para eliminar el carrito
        headers: {
          "Content-Type": "application/json",
        },
      });

      ticket.innerHTML = ""; // Limpia el contenido del ticket
      window.location.href = "/products"; // Redirige a la página de productos
    });
  });
};

// Llama a la función para obtener y mostrar el ticket de compra al cargar el script
ticketResponse();