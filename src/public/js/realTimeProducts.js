document.addEventListener('DOMContentLoaded', function () {
    const socket = io();
    let lastProductId = 0;

    // Manejador de Evento para Actualizar Productos:
    socket.on('updateProducts', updateProductsHandler);

    function updateProductsHandler(products) {
        const productList = document.getElementById('productList');

        productList.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.code}</td>
                <td>${product.stock}</td>
                <td><button class="eliminarBtn" data-id="${product.id}">Eliminar</button></td>
            `;
            productList.appendChild(row);

            // Actualizar lastProductId al máximo ID existente
            lastProductId = Math.max(lastProductId, product.id);
        });

        // Añadir manejadores de eventos para los botones de eliminar
        const eliminarButtons = document.querySelectorAll('.eliminarBtn');
        eliminarButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productId = parseInt(this.getAttribute('data-id'));
                if (!isNaN(productId)) {
                    socket.emit('eliminarProducto', productId);
                } else {
                    alert('Error al obtener el ID del producto.');
                }
            });
        });
    }

    // Manejador de Evento para Agregar Nuevos Productos:
    document.getElementById('addProductForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Agregar Nuevo Producto:
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const code = document.getElementById('code').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const stock = parseInt(document.getElementById('stock').value);
        const category = document.getElementById('category').value.trim();
        const thumbnails = document.getElementById('thumbnails').value.trim().split(',');

        const newProduct = {
            id: lastProductId + 1,
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails
        };

        socket.emit('addProduct', newProduct);

        // Incrementar lastProductId solo después de agregar el nuevo producto
        lastProductId++;

        this.reset();
    });
});