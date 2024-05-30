// Define la función middleware `executePolicies` que toma un array de políticas como parámetro
const executePolicies = (policies) => {
  return (req, res, next) => {
    // Si la primera política es "PUBLIC", permite el acceso sin ninguna verificación adicional
    if (policies[0] === "PUBLIC") return next();
    
    // Si la primera política es "NO_AUTH" y el usuario no está autenticado, permite el acceso
    if (policies[0] === "NO_AUTH" && !req.user) return next();
    
    // Si la primera política es "NO_AUTH" y el usuario está autenticado, retorna un mensaje de error
    if (policies[0] === "NO_AUTH" && req.user)
      return res.sendUnauthorized("Already Logged In");
    
    // Si la primera política es "AUTH" y el usuario está autenticado, permite el acceso
    if (policies[0] === "AUTH" && req.user) return next();
    
    // Si la primera política es "AUTH" y el usuario no está autenticado, retorna un mensaje de error
    if (policies[0] === "AUTH" && !req.user)
      return res.sendUnauthorized("Not logged");
    
    // Si no hay una política específica pero el usuario no está autenticado, retorna un mensaje de error
    if (!req.user) return res.sendUnauthorized("Not logged");
    
    // Si el rol del usuario no está incluido en las políticas, retorna un mensaje de error
    if (!policies.includes(req.user.role.toUpperCase())) {
      res.sendForbidden("Cannot access");
    }
    
    // Si todas las verificaciones pasan, llama a la siguiente función de middleware
    next();
  };
};

export default executePolicies; // Exporta la función `executePolicies` como el valor por defecto del módulo