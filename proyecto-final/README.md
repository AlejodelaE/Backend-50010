# Kinetoscope Node.js Ecommerce App

Este proyecto es una aplicación web de ecommerce desarrollada en Node.js utilizando Express y MongoDB como base de datos. La aplicación, llamada "Kinetoscope," se enfoca en la venta de impresoras y fotocopiadoras.

## Despliegue

La aplicación Kinetoscope ha sido desplegada y está disponible en el siguiente enlace: [Kinetoscope en Render](https://backend-50010.onrender.com).

## Características Principales

- **Catálogo de Productos:** Explora una gran variedad de videojuegos para la compra.
- **Carrito de Compras:** Añade productos al carrito y gestiona tus compras de manera fácil y rápida.
- **Autenticación de Usuarios:** Crea una cuenta o inicia sesión para acceder a funciones personalizadas como historial de compras e información de cuenta.
- **Proceso de Pago Seguro:** Completa transacciones de manera segura utilizando métodos de pago confiables.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/AlejodelaE/Backend-50010.git
   ```
   Abre la carpeta "proyecto-final".


2. Instala las dependencias:

   ```bash
   cd proyecto-final
   npm install
   ```

3. Configure las variables de entorno:
   Crea un archivo `.env.dev` y `.env.prod` en la raíz del proyecto y configura las variables de entorno necesarias.

4. Inicia la aplicación:

   ```bash
   npm start
   ```

   La aplicación estará disponible en [http://localhost:8080](http://localhost:8080).

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Railway (Deployment Platform)

## Instrucciomes
1. .env
   - El proyecto viene incluido con 2 .env, los cuales son .env.dev y .env.prod

2. login - register
   - En localhost:8080 se pueden hacer las acciones de Registrase e Iniciar Sesión
      Registro: Al dar clic en "Registrarse" aparecera un formulario para llenar, al llenarlo y darle clic en "Registrar usuario" un nuevo usuario sera creado, notificando por correo la bienvenida al usuario.
      Iniciar Sesión: En "Home" colocar email y contraseña pára iniciar sesion.

3. Poder entrar como admin
   - En los archivos .env se puede ver las credenciales para iniciar sesión como admin.

4. crud de producto
   - Al entrar como admin en "Mi perfil", se puede visualizar una seccion que se llama "Ir al panel de administración de productos", permite registrar un nuevo producto y eliminarlo.

5. Proceso de compra
   - Entrando como usuario en "Productos, se puede observar los productos disponibles con sus caracteristicas, eligiendo uno o más productos (ya sea del mismo producto o de otro producto diferente).
   Luego uno se tiene que ubicar en "Carrito" donde se podra observar los productos elegidos con sus caracteristcias y cantidades.
   Al dar "Finalizar compra" (Dos veces) se podra observar la compra finalizada con ticket, usuario, productos, fecha de compra, etc.

6. Deploy
   https://backend-50010.onrender.com

7.Cambiar rol
   - Como usuario uno tiene que ingresar a "Mi perfil", se podra observar una opción para agregar documentos y asi poder cambiar a usuario premium, al ingresar se tiene que subir 5 archvos para enviarlos y poder cambiar de usuario a usuario premium, en la terminal de VSC se observara los datos del usuario con el que uno este ingresado, en el cual "isPremium" cambia de false a true (Se recomienda cerrar sesión y luego volver a iniciarla para ver el cambio).

8. Restablecer contraseña
   - En "Home" hay una opcion que se llama "Olvidaste tu contraseña? Puedes restablecerla aqui".
   Al dar clic se tiene que colocar un correo que ya halla sido registrado y sea real para que llegue una notificacion por correo con un link para poder cambiar de contraseña, lo cual permitira iniciar sesion con la nueva contraseña