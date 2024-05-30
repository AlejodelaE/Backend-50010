// Selección del formulario de actualización a premium y los elementos de carga de archivos
const premiumForm = document.getElementById("premiumForm");
const uploadFile = document.querySelectorAll("input[type='file']");

// Variable para almacenar el elemento de carga actual
let currentLoadingElement = null;

// Función asíncrona para obtener la información del usuario actual
const fetchUser = async () => {
  const response = await fetch("/api/sessions/current", {
    method: "GET", // Método HTTP GET
  });
  if (!response || !response.ok) {
    throw new Error("No se pudo obtener la información del usuario"); // Lanza un error si la respuesta no es exitosa
  }
  const result = await response.json();
  const user = result.payload;

  if (!user) {
    throw new Error("El usuario no está definido"); // Lanza un error si el usuario no está definido
  }

  return user; // Retorna la información del usuario
};

// Agrega un evento de cambio a cada input de tipo archivo
uploadFile.forEach((file) => {
  file.addEventListener("change", (event) => {
    // Elimina el elemento de carga actual si existe
    if (currentLoadingElement) {
      currentLoadingElement.parentNode.removeChild(currentLoadingElement);
    }

    // Crea un nuevo elemento de carga
    const loading = document.createElement("span");
    loading.innerHTML = "Listo, siguiente por favor"; // Mensaje de carga completada
    event.target.parentNode.appendChild(loading);

    currentLoadingElement = loading; // Almacena el elemento de carga actual
  });
});

// Llama a la función fetchUser al cargar el script
fetchUser();

// Agrega un evento de envío al formulario de actualización a premium
premiumForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Previene el comportamiento predeterminado del formulario

  // Desactiva el botón de envío del formulario
  premiumForm.querySelector("#premiumSubmit").disabled = true;

  try {
    const user = await fetchUser(); // Obtiene la información del usuario

    const formData = new FormData(premiumForm); // Crea un objeto FormData con los datos del formulario

    // Envía la solicitud para cargar los documentos del usuario
    const response = await fetch(`/api/users/${user.id}/documents`, {
      method: "POST", // Método HTTP POST
      body: formData, // Cuerpo de la solicitud con los datos del formulario
    }).then((response) => {
      if (response.status === "success" || response.status === 200) {
        // Muestra un mensaje de éxito
        Swal.fire({
          title: "¡Felicitaciones!",
          text: "Tu documentación ha sido guardada con éxito, ¡Gracias!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Error en la solicitud:", response.error); // Muestra un error en la consola si la solicitud falla
      }
    });
  } catch (error) {
    console.error("Error en la solicitud:", error.message); // Muestra un error en la consola si ocurre una excepción
  } finally {
    // Reactiva el botón de envío del formulario
    premiumForm.querySelector("#premiumSubmit").disabled = false;

    // Elimina el elemento de carga actual si existe
    if (currentLoadingElement) {
      currentLoadingElement.parentNode.removeChild(currentLoadingElement);
      currentLoadingElement = null;
    }
  }
});