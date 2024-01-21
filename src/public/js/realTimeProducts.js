const socket = io();

// Obtener referencia al formulario y a la lista de productos en tiempo real
const productForm = document.getElementById('productForm');
const realTimeProductList = document.getElementById('realTimeProductList');

// Escuchar evento para actualizar la lista de productos en tiempo real
socket.on('updateProducts', (products) => {
    // Limpiar la lista antes de agregar los nuevos productos
    realTimeProductList.innerHTML = '';

    products.forEach((product) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>ID:</strong> ${product.id} <br>
            <strong>Título:</strong> ${product.title} <br>
            <strong>Descripción:</strong> ${product.description} <br>
            <strong>Código:</strong> ${product.code} <br>
            <strong>Precio:</strong> ${product.price} <br>
            <strong>Status:</strong> ${product.status} <br>
            <strong>Stock:</strong> ${product.stock} <br>
            <strong>Categoría:</strong> ${product.category} <br>
            <strong>Thumbnails:</strong> ${product.thumbnails} <br>
            <!-- Agregar otros campos según sea necesario -->
        `;
        realTimeProductList.appendChild(li);
    });
});

// Manejar el evento de submit del formulario
productForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const thumbnails = document.getElementById('thumbnails').value;

    // Emitir evento al servidor para agregar un nuevo producto
    socket.emit('addProduct', { title, description, code, price, stock, category, thumbnails });

    console.log('Evento addProduct emitido al servidor');
});