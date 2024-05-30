import passport from "passport"; // Importa el módulo passport para la autenticación
import { Strategy as LocalStrategy } from "passport-local"; // Importa la estrategia local de passport
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt"; // Importa la estrategia JWT de passport
import GitHubStrategy from "passport-github2"; // Importa la estrategia de GitHub de passport
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Importa la estrategia de Google de passport

import { usersService, cartsService } from "../services/index.js"; // Importa los servicios de usuarios y carritos
import authService from "../services/authService.js"; // Importa el servicio de autenticación
import config from "./config.js"; // Importa la configuración
import { errorCodes } from "../dictionaries/errorCodes.js"; // Importa códigos de error (asumiendo que los usarás en algún lugar)

const initializePassportStrategies = () => {
  // Estrategia de registro local
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email", session: false },
      async (req, email, password, done) => {
        try {
          const { firstName, lastName, email, password } = req.body; // Desestructura el nombre, apellido, email y contraseña del cuerpo de la solicitud
          if (!firstName || !lastName || !email || !password) {
            return done(null, false, { message: "Incomplete values" }); // Verifica que los valores no estén incompletos
          }

          const exists = await usersService.getUserBy({ email }); // Verifica si el usuario ya existe
          if (exists) {
            return done(null, false, { message: "User already exists" }); // Si el usuario existe, retorna un mensaje de error
          }

          const hashedPassword = await authService.createHash(password); // Hashea la contraseña

          const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
          };

          let cart;
          if (req.cookies["cart"]) {
            cart = req.cookies["cart"]; // Si hay una cookie de carrito, úsala
          } else {
            const cartResult = await cartsService.createCart(); // Crea un nuevo carrito
            cart = cartResult.id;
          }
          newUser.cart = cart; // Asigna el carrito al nuevo usuario

          const result = await usersService.createUser(newUser); // Guarda el nuevo usuario en la base de datos
          return done(null, result); // Retorna el nuevo usuario
        } catch (error) {
          console.log(error); // Muestra el error en la consola
          return done(error); // Retorna el error
        }
      }
    )
  );

  // Estrategia de inicio de sesión local
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", session: false },
      async (email, password, done) => {
        try {
          // Verifica si las credenciales son de un administrador
          if (
            email === config.app.ADMIN_EMAIL &&
            password === config.app.ADMIN_PASSWORD
          ) {
            const adminUser = {
              role: "admin",
              id: "0",
              firstName: "admin",
            };
            return done(null, adminUser); // Retorna el usuario administrador
          }

          const user = await usersService.getUserBy({ email }); // Busca el usuario en la base de datos
          if (!user) {
            return done(null, false, { message: "Invalid Credentials" }); // Si el usuario no existe, retorna un mensaje de error
          }

          const isValidPassword = await authService.validatePassword(
            password,
            user.password
          ); // Verifica la contraseña
          if (!isValidPassword) {
            return done(null, false, { message: "Invalid Credentials" }); // Si la contraseña es inválida, retorna un mensaje de error
          }
          return done(null, user); // Retorna el usuario
        } catch (error) {
          console.log(error); // Muestra el error en la consola
          return done(error); // Retorna el error
        }
      }
    )
  );

  // Estrategia JWT
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          authService.extractAuthToken,
        ]), // Extrae el token JWT de la solicitud usando la función extractAuthToken
        secretOrKey: config.jwt.SECRET, // Utiliza el secreto definido en la configuración
      },
      async (payload, done) => {
        console.log('JWT Strategy Payload:', payload); // Muestra el payload del JWT en la consola
        return done(null, payload); // Retorna el payload
      }
    )
  );

  // Estrategia de GitHub
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.github.CLIENT_ID, // ID de cliente de GitHub
        clientSecret: config.github.CLIENT_SECRET, // Secreto de cliente de GitHub
        callbackURL: "http://localhost:8080/api/sessions/githubcallback", // URL de callback de GitHub
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile._json.email; // Obtiene el email del perfil de GitHub

        let user = await usersService.getUserBy({ email }); // Busca el usuario en la base de datos
        if (!user) {
          const newUser = {
            first_name: profile._json.name,
            last_name: "",
            age: "",
            email,
            password: "",
            admin: false,
          };

          const cartResult = await cartsService.createCart(); // Crea un nuevo carrito
          newUser.cart = cartResult.id; // Asigna el carrito al nuevo usuario

          const result = await usersService.createUser(newUser); // Guarda el nuevo usuario en la base de datos
          return done(null, result); // Retorna el nuevo usuario
        } else {
          return done(null, user); // Retorna el usuario existente
        }
      }
    )
  );

  // Estrategia de Google
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: config.google.CLIENT_ID, // ID de cliente de Google
        clientSecret: config.google.CLIENT_SECRET, // Secreto de cliente de Google
        callbackURL: "http://localhost:8080/api/sessions/googlecallback", // URL de callback de Google
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const { _json } = profile; // Desestructura el perfil para obtener el JSON del usuario
          const user = await usersService.getUserBy({ email: _json.email }); // Busca el usuario en la base de datos
  
          if (user) {
            console.log("Usuario encontrado en Google:", user); // Muestra el usuario encontrado en la consola
            return done(null, user); // Retorna el usuario encontrado
          } else {
            const newUser = {
              firstName: _json.given_name,
              lastName: _json.family_name,
              email: _json.email,
            };
  
            let cart;
            if (req.cookies && req.cookies["cart"]) {
              cart = req.cookies["cart"]; // Si hay una cookie de carrito, úsala
            } else {
              const cartResult = await cartsService.createCart(); // Crea un nuevo carrito
              cart = cartResult.id;
              res.cookie("cart", cart); // Establece la cookie del carrito
            }        
  
            newUser.cart = cart; // Asigna el carrito al nuevo usuario
            const result = await usersService.createUser(newUser); // Guarda el nuevo usuario en la base de datos
            console.log("Nuevo usuario creado en Google:", result); // Muestra el nuevo usuario creado en la consola
            return done(null, result); // Retorna el nuevo usuario
          }
        } catch (error) {
          console.error("Error en la estrategia de Google:", error); // Muestra el error en la consola
          return done(error); // Retorna el error
        }
      }
    )
  );
};

export default initializePassportStrategies; // Exporta la función de inicialización de estrategias de passport
