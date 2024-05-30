// Selección de elementos del DOM
const form = document.getElementById("formProductCreator"); // Selecciona el formulario de creación de producto
const deleteBtn = document.getElementById("delete-btn"); // Selecciona el botón de eliminar
const addBtn = document.getElementById("add-btn"); // Selecciona el botón de agregar

// Obtiene la sesión actual y ajusta la habilitación de los botones según el rol del usuario
fetch("/api/sessions/current")
  .then((response) => response.json())
  .then((userData) => {
    if (userData.role === "ADMIN") {
      deleteBtn.disabled = false; // Habilita el botón de eliminar para el administrador
      addBtn.disabled = false; // Habilita el botón de agregar para el administrador
    } else if (userData.role === "PREMIUM") {
      deleteBtn.disabled = true; // Deshabilita el botón de eliminar para usuarios premium
      addBtn.disabled = false; // Habilita el botón de agregar para usuarios premium
    }
  })
  .catch((error) => console.error(error)); // Maneja cualquier error en la obtención de la sesión

// Evento de envío del formulario de creación de producto
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Previene el comportamiento predeterminado del formulario

  // Obtiene los datos del formulario y los organiza en un objeto
  const formData = new FormData(form);
  const productData = {};
  formData.forEach((value, key) => {
    productData[key] = value;
  });

  try {
    // Obtiene la sesión actual para determinar el propietario del producto
    const responseUser = await fetch("/api/sessions/current");
    const userData = await responseUser.json();

    // Asigna el propietario del producto según el rol del usuario
    if (userData.role === "PREMIUM") {
      productData.owner = userData.email; // El propietario es el usuario premium
    } else {
      productData.owner = "admin"; // El propietario es el administrador
    }

    // Envía los datos del producto al servidor para crear el nuevo producto
    const responseProduct = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData), // Convierte los datos del producto a formato JSON
    });

    const result = await responseProduct.json();
    if (responseProduct.ok) {
      console.log(result.message); // Muestra un mensaje de éxito en la consola
      form.reset(); // Resetea el formulario
    } else {
      console.error(result.message); // Muestra un mensaje de error en la consola
    }
  } catch (error) {
    console.error(error); // Maneja cualquier error durante la creación del producto
  }
});