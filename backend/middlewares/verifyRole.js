export function verifyRole(...tiposPermitidos) {
  return (req, res, next) => {
    const tipo = req.usuario.tipo_persona_id;

    if (req.usuario.is_admin === true) {
      console.log("ROL ADMINISTRADOR ✅");
      return next();
    }
    if (!tipo || !tiposPermitidos.includes(tipo)) {
      console.log("ROL DENEGADO ❌");
      return res.status(403).json({ message: "Acceso denegado" });
    }
    console.log("ROL PERMITIDO ✅");
    next();
  };
}
