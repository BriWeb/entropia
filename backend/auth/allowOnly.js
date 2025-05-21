export function permitirTipo(...tiposPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      console.log("¡Error en el Payload!");
      return res.status(403).json({ mensaje: "Acceso denegado" });
    }
    const tipo = req.usuario.tipo_persona_id;

    // Si es admin se saltea la verificación
    if (req.usuario.is_admin === true) {
      return next();
    }
    if (!tipo || !tiposPermitidos.includes(tipo)) {
      console.log("Tipo:", tipo, "-- ACCESO DENEGADO ❌");
      return res.status(403).json({ message: "Acceso denegado" });
    }
    console.log("Tipo:", tipo, "-- ACCESO PERMITIDO ✅");
    next();
  };
}
