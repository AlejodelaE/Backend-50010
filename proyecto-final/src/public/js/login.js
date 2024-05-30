// Selección de elementos del DOM
var form_login = document.querySelector(".login_Form"); // Selecciona el formulario de inicio de sesión
var form_register = document.querySelector(".register_Form"); // Selecciona el formulario de registro
var container_login_register = document.querySelector(".container-login-register"); // Selecciona el contenedor de los formularios
var back_box_login = document.querySelector(".back-box-login"); // Selecciona la caja de fondo del inicio de sesión
var back_box_register = document.querySelector(".back-box-register"); // Selecciona la caja de fondo del registro

// Agrega un evento para ajustar la página según el tamaño de la ventana
window.addEventListener("resize", anchoPage);

// Función para ajustar la visibilidad de los formularios según el ancho de la página
function anchoPage() {
  if (window.innerWidth > 850) {
    form_login.style.display = "block"; // Muestra el formulario de inicio de sesión
    container_login_register.style.left = "10px"; // Ajusta la posición del contenedor
    form_register.style.display = "none"; // Oculta el formulario de registro
    back_box_register.style.opacity = "1"; // Muestra la caja de fondo del registro
    back_box_login.style.opacity = "0"; // Oculta la caja de fondo del inicio de sesión
  } else {
    form_login.style.display = "block"; // Muestra el formulario de inicio de sesión
    container_login_register.style.left = "0px"; // Ajusta la posición del contenedor
    form_register.style.display = "none"; // Oculta el formulario de registro
    back_box_register.style.display = "block"; // Muestra la caja de fondo del registro
    back_box_login.style.display = "none"; // Oculta la caja de fondo del inicio de sesión
  }
}

// Llama a la función para ajustar la página al cargar el script
anchoPage();

// Selección del formulario de inicio de sesión
const form = document.getElementById("loginForm");

// Agrega un evento de envío al formulario de inicio de sesión
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Previene el comportamiento predeterminado del formulario
  const data = new FormData(form); // Crea un objeto FormData con los datos del formulario
  const obj = {}; // Crea un objeto vacío para almacenar los datos del formulario
  data.forEach((value, key) => (obj[key] = value)); // Llena el objeto con los datos del formulario
  const response = await fetch("/api/sessions/login", {
    method: "POST", // Método HTTP
    body: JSON.stringify(obj), // Cuerpo de la solicitud en formato JSON
    headers: {
      "Content-Type": "application/json", // Tipo de contenido de la solicitud
    },
  });
  const result = await response.json(); // Parsea la respuesta en formato JSON
  if (response.status === 200) {
    window.location = "/profile"; // Redirige a la página de perfil si la respuesta es exitosa
  }
});

// Función para restablecer la contraseña
async function restorePassword() {
  Swal.fire({
    text: "Ingresa tu email para restablecer tu contraseña", // Muestra un mensaje para ingresar el email
    input: "text", // Tipo de entrada
    inputValidator: (value) => {
      if (!value) {
        return "Necesitas escribir tu email para restablecer tu contraseña"; // Valida que el campo no esté vacío
      }
    },
  }).then(async (result) => {
    try {
      if (result.value) {
        const email = result.value; // Obtiene el email ingresado
        const response = await fetch("/api/sessions/passwordRestoreRequest", {
          method: "POST", // Método HTTP
          body: JSON.stringify({ email }), // Cuerpo de la solicitud en formato JSON
          headers: {
            "Content-Type": "application/json", // Tipo de contenido de la solicitud
          },
        });
        Swal.fire({
          icon: "success",
          text: "Si el email existe en nuestra base de datos, se enviará un email para restablecer tu contraseña", // Muestra un mensaje de éxito
        });
      }
    } catch (error) {
      console.log(error); // Muestra cualquier error en la consola
    }
  });
}