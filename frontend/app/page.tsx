// Acá traigo la función "redirect" que me permite enviar al usuario a otra página
import { redirect } from "next/navigation";


export default function Home() {
  // Esto sirve para mandar al usuario directamente a la página de login
  // cuando alguien entra a la página principal
  redirect('/login');
}