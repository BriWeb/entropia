"use client"; // pára q ue Next.js sepa que el codigo se ejecuta en el navegador y no en el servidor

import { useState } from "react"; 
import { useRouter } from "next/navigation"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import { Card } from "@/components/ui/card"; 
import { Separator } from "@/components/ui/separator"; 

export default function LoginPage() {
  // Acá guardo las herramientas que necesito para cambiar de página y guardar lo que escribe el usuario
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Esto se ejecuta cuando el usuario hace clic en "Iniciar sesión"
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Acá verifico si el usuario escribió algo en los campos
    if (!email || !password) {
      alert("Por favor ingrese su correo y contraseña");
      return;
    }

    // Acá verifico qué tipo de usuario es para mandarlo a su página
    if (email === "recepcionista@ejemplo.com") {
      router.push("/secretaria/dashboard"); // Esto lo manda a la página de secretaria
    } else if (email === "doctor@ejemplo.com") {
      router.push("/doctor/dashboard"); // Esto lo manda a la página de doctor
    } else {
      alert("Credenciales incorrectas"); // Esto le avisa que los datos están mal
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sistema de turnos</h1>
          <p className="text-gray-500">Inicie sesión en su cuenta</p>
        </div>

        {/* Acá está el formulario dentro de la card blanca */}
        <Card className="bg-white p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Esto es el campo para el correo */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-left"
              >
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Esto guarda lo que escribe
                placeholder="correo@ejemplo.com"
                className="w-full"
                required
              />
            </div>

            {/* Esto es el campo para la contraseña */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-left"
              >
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Esto guarda la contraseña
                placeholder="••••••••"
                className="w-full"
                required
              />
            </div>

            {/*  "Recuérdame" y "Olvidó su contraseña" */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} // Esto guarda si marcó el checkbox
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label 
                  htmlFor="remember-me" 
                  className="ml-2 block text-sm text-gray-700"
                >
                  Recuérdame
                </label>
              </div>
              <a 
                href="#" 
                className="text-sm text-gray-700 hover:underline"
              >
                ¿Olvidó su contraseña?
              </a>
            </div>

            {/* Esto es el botón para enviar el formulario */}
            <Button 
              type="submit" 
              className="w-full"
            >
              Iniciar sesión
            </Button>
          </form>
        </Card>

        {/* Acá están los datos de prueba para entrar al sistema */}
        <div className="space-y-2">
          <Separator />
          <h2 className="text-sm font-medium">correo para testear algo</h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md border p-2">
              <p className="font-medium">Recepcionista</p>
              <p>recepcionista@ejemplo.com</p>
              <p>123456</p>
            </div>
            <div className="rounded-md border p-2">
              <p className="font-medium">Doctor</p>
              <p>doctor@ejemplo.com</p>
              <p>123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
