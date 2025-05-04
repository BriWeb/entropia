export function permitirTipo(...tiposPermitidos) {
    return (req, res, next) => {
        if (!req.usuario) {
            console.log("¡Error en el Payload!");
            return res.status(403).json({ mensaje: "Acceso denegado" });
        }
        const tipo = req.usuario.tipo_persona_id;
        // ¿¿¿Deberíamos poner en el payload un 'is_admin' para saber si el usuario es admin y proporcionarle acceso a todo???
        /*
        if (req.user.is_admin === true) {
          return next();
        }*/
        if (!tipo || !tiposPermitidos.includes(tipo)) {
            console.log("Tipo:", tipo, "-- ACCESO DENEGADO ❌");
            return res.status(403).json({ message: "Acceso denegado" });
        }
        console.log("Tipo:", tipo, "-- ACCESO PERMITIDO ✅");
        next();
    };
}
