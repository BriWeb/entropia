export function dateNow(req, res, next) {
  if (req.path === "/turno/today" && !req.query.fecha) {
    req.fechaToday = new Date().toISOString().slice(0, 10);
  }
  next();
}
