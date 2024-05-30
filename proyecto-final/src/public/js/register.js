// Selección de elementos del DOM
var form_login = document.querySelector(".login_Form"); // Selecciona el formulario de inicio de sesión
var form_register = document.querySelector(".register_Form"); // Selecciona el formulario de registro
var container_login_register = document.querySelector(".container-login-register"); // Selecciona el contenedor de los formularios
var back_box_login = document.querySelector(".back-box-login"); // Selecciona la caja de fondo del inicio de sesión
var back_box_register = document.querySelector(".back-box-register"); // Selecciona la caja de fondo del registro

// Agrega un evento para ajustar la página según el tamaño de la ventana
window.addEventListener("resize", anchoPage);

// Función para ajustar la visibilidad de los formularios según el ancho de la página
function anchoPage(){
    if (window.innerWidth > 850){
        form_register.style.display = "block"; // Muestra el formulario de registro
        container_login_register.style.left = "410px"; // Ajusta la posición del contenedor
        form_login.style.display = "none"; // Oculta el formulario de inicio de sesión
        back_box_register.style.opacity = "0"; // Oculta la caja de fondo del registro
        back_box_login.style.opacity = "1"; // Muestra la caja de fondo del inicio de sesión
    } else {
        form_register.style.display = "block"; // Muestra el formulario de registro
        container_login_register.style.left = "0px"; // Ajusta la posición del contenedor
        form_login.style.display = "none"; // Oculta el formulario de inicio de sesión
        back_box_register.style.display = "none"; // Oculta la caja de fondo del registro
        back_box_login.style.display = "block"; // Muestra la caja de fondo del inicio de sesión
        back_box_login.style.opacity = "1"; // Ajusta la opacidad de la caja de fondo del inicio de sesión
    }
}

// Llama a la función para ajustar la página al cargar el script
anchoPage();

// Selección del formulario de registro
const form = document.getElementById("registerForm");

// Agrega un evento de envío al formulario de registro
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Previene el comportamiento predeterminado del formulario

  // Obtiene los datos del formulario
  const data = new FormData(form);
  const obj = {}; // Crea un objeto vacío para almacenar los datos del formulario
  data.forEach((value, key) => (obj[key] = value)); // Llena el objeto con los datos del formulario

  // Envía una solicitud para registrar al usuario
  const response = await fetch("/api/sessions/register", {
    method: "POST", // Método HTTP
    body: JSON.stringify(obj), // Cuerpo de la solicitud en formato JSON
    headers: {
      "Content-Type": "application/json", // Tipo de contenido de la solicitud
    },
  });

  const result = await response.json(); // Parsea la respuesta en formato JSON

  // Si la solicitud fue exitosa, redirige a la página de inicio de sesión
  if (response.status === 200) {
    return window.location.replace("/login");
  }
});