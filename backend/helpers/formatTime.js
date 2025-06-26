export function formatTime(element) {
  return (
    element.horario.getUTCHours().toString().padStart(2, "0") +
    ":" +
    element.horario.getUTCMinutes().toString().padStart(2, "0")
  );
}
