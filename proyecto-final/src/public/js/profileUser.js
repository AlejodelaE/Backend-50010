// Selección de elementos del DOM
const profile = document.getElementById("profile"); // Selecciona el elemento del perfil
const logoutButton = document.getElementById("logout"); // Selecciona el botón de cerrar sesión

// Si existe el botón de cerrar sesión, agrega un evento de click
if (logoutButton) {
  logoutButton.addEventListener("click", adios); // Asigna la función 'adios' al evento de click
}

// Función para renderizar la vista del usuario según su rol
const renderUserView = (payload) => {
  let content; // Variable para almacenar el contenido HTML

  switch (payload.role) {
    case "user":
      if (payload.isPremium === false) {
        content = `
          <h4 class="profileName">Hola ${payload.name}</h4>
          <p class="profileEmail">Email: ${payload.email}</p>
          <p class="profileRole">Rol: ${payload.role}</p>
          <p> ¿Deseas ser premium? Primero debe agregar la documentación!</p>
          <button class="btn btn-success" onclick="premium()">Agregar documentos</button>
        `;
      } else {
        content = `
          <h4 class="profileName">Hola ${payload.name}</h4>
          <p class="profileEmail">Email: ${payload.email}</p>
          <p class="profileRole">Rol: ${payload.role}</p>
          <p> Ya cumples con los requisitos para ser premium</p>
          <button class="btn btn-success" onclick="updateUserPremiumStatus('${payload.id}')">Ser premium</button>
        `;
      }
      break;

    case "premium":
      content = `
        <h4 class="profileName">Hola ${payload.name}</h4>
        <p class="profileEmail">Email: ${payload.email}</p>
        <p class="profileRole">Rol: ${payload.role}</p>
        <p> ¿Deseas vender un producto?</p>
        <button class="btn btn-success" onclick="productCreator()">Sí</button>
      `;
      break;

    case "admin":
      content = `
        <h4 class="profileName">Hola</h4>
        <p class="profileRole">Rol: ${payload.role}</p>
        <p> Ir al panel de administración de productos</p>
        <button class="btn btn-success" onclick="productCreator()">Sí</button>
        <p> Ir al panel de administración de Usuarios</p>
        <a href="/api/users" class="btn btn-success">Sí</a>
      `;
      break;

    default:
      content = "Rol no reconocido";
  }

  profile.innerHTML = `
    <div>${content}</div>
  `;
};

// Función asíncrona para obtener la información del usuario actual
const fetchCurrentUser = async () => {
  try {
    const response = await fetch("/api/sessions/current", {
      method: "GET", // Método HTTP GET para obtener la sesión actual
    });

    if (response.ok) {
      const result = await response.json(); // Parsea la respuesta en formato JSON
      console.log(result.payload);
      renderUserView(result.payload); // Renderiza la vista del usuario
      return result.payload;
    }
  } catch (error) {
    console.error(error); // Muestra cualquier error en la consola
  }
};

// Función para cerrar sesión
async function adios() {
  console.log("adios");
  try {
    const response = await fetch("/api/sessions/logout", {
      method: "GET", // Método HTTP GET para cerrar sesión
    });

    if (response.status === 200) {
      window.location = "/"; // Redirige a la página principal si la respuesta es exitosa
    }
  } catch (error) {
    console.error(error); // Muestra cualquier error en la consola
  }
}

// Función para redirigir a la página de agregar documentos para ser premium
async function premium() {
  window.location = "/premium";
}

// Función para redirigir a la página de creación de producto
async function productCreator() {
  window.location = "/productCreator";
}

// Función para actualizar el estado premium del usuario
const updateUserPremiumStatus = async (uid) => {
  fetchCurrentUser(); // Obtiene la información del usuario actual
  const premiumUser = await fetch(`/api/users/premium/${uid}`, {
    method: "PUT", // Método HTTP PUT para actualizar el estado premium
  })
    .then((res) => res.json()) // Parsea la respuesta en formato JSON
    .then((data) => {
      renderUserView(data.payload.role); // Renderiza la vista del usuario con el nuevo rol
    });
};

// Llama a la función para obtener la información del usuario actual al cargar el script
fetchCurrentUser();
renderUserView();