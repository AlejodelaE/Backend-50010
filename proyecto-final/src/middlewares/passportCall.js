import passport from "passport"; // Importa el módulo passport para la autenticación

// Define y exporta la función `passportCall`
const passportCall = (strategy, options = {}) => {
  // Retorna una función middleware que utiliza passport para autenticar
  return (req, res, next) => {
    // Llama a passport.authenticate con la estrategia y las opciones proporcionadas
    passport.authenticate(strategy, options, async (error, user, info) => {
      if (error) return next(error); // Si hay un error, llama a la siguiente función de middleware con el error

      if (!options.strategyType) {
        return res.sendInternalError("strategyType not defined"); // Si no se define el tipo de estrategia, retorna un error
      }

      if (!user) {
        // Si no se encuentra un usuario, maneja la respuesta basada en el tipo de estrategia
        switch (options.strategyType) {
          case "LOCALS": {
            return res.status(401).send({
              status: "error",
              error: info.message ? info.message : info.toString(), // Retorna un error 401 con el mensaje de error
            });
          }
          case "JWT": {
            req.user = null; // Establece req.user como null
            return next(); // Llama a la siguiente función de middleware
          }
        }
      }

      req.user = user; // Si se encuentra un usuario, lo asigna a req.user
      next(); // Llama a la siguiente función de middleware
    })(req, res, next);
  };
};

export default passportCall; // Exporta la función `passportCall` como el valor por defecto del módulo