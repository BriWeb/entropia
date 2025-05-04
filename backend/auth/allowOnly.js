export function permitirTipo(tipoPermitido) {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(403).json({ mensaje: "Acceso denegado" });
        }
        // Deberíamos poner en el payload un 'is_admin' para saber si el usuario es admin y proporcionarle acceso a todo?
        /*
        if (req.user.is_admin === true) {
          return next();
        }*/
        if (req.usuario.tipo_persona_id !== tipoPermitido) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        console.log("Tipo:", req.usuario.tipo_persona_id, ". ACCESO PERMITIDO");
        next();
    };
}
