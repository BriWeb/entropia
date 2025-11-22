export function evaluateError(error) {
  return error.code === "ELOGIN" ||
    error.code === "ETIMEOUT" ||
    error.code === "ESOCKET"
    ? "No se pudo conectar a la base de datos. Por favor, intentá nuevamente más tarde."
    : "Ocurrió un error interno al procesar la solicitud.";
}
