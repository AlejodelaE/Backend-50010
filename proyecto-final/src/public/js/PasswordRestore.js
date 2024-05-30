// Selección del formulario de restablecimiento de contraseña
const form = document.getElementById("restoreForm");

// Obtención de los parámetros de la URL
const urlParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

// Agrega un evento de envío al formulario de restablecimiento de contraseña
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Previene el comportamiento predeterminado del formulario

  // Obtención de los datos del formulario
  const data = new FormData(form);
  const obj = {}; // Crea un objeto vacío para almacenar los datos del formulario
  data.forEach((value, key) => (obj[key] = value)); // Llena el objeto con los datos del formulario

  // Agrega el token de la URL al objeto de datos
  obj.token = urlParams.token;

  // Envío de la solicitud para restablecer la contraseña
  const response = await fetch("/api/sessions/password-restore", {
    method: "PUT", // Método HTTP
    body: JSON.stringify(obj), // Cuerpo de la solicitud en formato JSON
    headers: {
      "Content-Type": "application/json", // Tipo de contenido de la solicitud
    },
  });

  // Obtención del resultado de la respuesta
  const result = await response.json();

  // Si la solicitud fue exitosa, muestra una alerta y redirige a la página de inicio de sesión
  if (response.status === 200) {
    Swal.fire({
      icon: "success",
      text: "Tu contraseña ha sido restablecida", // Muestra un mensaje de éxito
      timer: 2000, // Tiempo para cerrar automáticamente la alerta
    }).then(() => {
      window.location.replace("/login"); // Redirige a la página de inicio de sesión
    });
  }
});