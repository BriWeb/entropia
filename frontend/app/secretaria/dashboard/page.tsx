"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useFetch } from "@/hooks/useFetch";
// Traemos el contexto donde se guarda el usuario
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";

export default function DashboardSecretaria() {
  // extraemos el usuario
  const { usuario } = useAuth();

  interface Turno {
    especialidad: string;
    nombre: string;
    apellido: string;
    horario: string; // formato "HH:mm"
  }

  interface HorariosPorProfesional {
    [id: string]: Turno[];
  }

  const { loading, data, error } = useFetch<HorariosPorProfesional>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/medico/today`,
    requiredAuth: true, // indica que debe incluir a el usuario actual en los encabezados para autorizar
  });

  useEffect(() => {
    if (data) {
      console.log("Turnos obtenidos: ", data);
    }
  }, [data]);

  return (
    <AuthGuard>
      <>
        <div className="p-8 sm:px-6 lg:px-8 bg-secondary">
          <div>
            <h1 className="text-2xl font-bold">
              Bienvenido/a {usuario?.nombre}{" "}
            </h1>
            <p className="text-sm text-gray-500">
              Gestiona turnos y registros de pacientes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7 mb-6">
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">Turnos de Hoy</h1>
                <CardTitle>
                  <p className="text-2xl font-bold">2</p>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">Total de Pacientes</h1>
                <CardTitle>
                  <p className="text-2xl font-bold">4</p>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">Programados Hoy</h1>
                <CardTitle>
                  <p className="text-2xl font-bold">2</p>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <h1 className="text-sm text-gray-500">
                  Pacientes Nuevos(Semana)
                </h1>
                <CardTitle>
                  <p className="text-2xl font-bold">3</p>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Buscar Paciente</h3>
            <div>
              <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="nombre">Documento de Identidad</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="text"
                    id="nombre"
                    placeholder="Ingrese el documento de identidad"
                  />
                  <Button className="sm:w-auto w-full">Buscar</Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center border border-gray-300 rounded-md p-4">
              <p>No se ha seleccionado o encontrado ningún paciente </p>
              <Button>Registrar nuevo paciente</Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="w-full  rounded-md ">
                <label className="text-md  text-gray-500" htmlFor="nombre">
                  Especialidad
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 bg-secondary"
                  name="especialidad"
                  id="especialidad"
                >
                  <option value="1">Especialidad 1</option>
                  <option value="2">Especialidad 2</option>
                  <option value="3">Especialidad 3</option>
                </select>
              </div>
              <div className="w-full  rounded-md ">
                <label className="text-md  text-gray-500" htmlFor="fecha">
                  Fecha
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 bg-secondary"
                  name="fecha"
                  id="fecha"
                >
                  <option value="1">Fecha 1</option>
                  <option value="2">Fecha 2</option>
                  <option value="3">Fecha 3</option>
                </select>
              </div>
            </div>

            {loading && <Loading />}
            {error && <Error error={error} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              {data &&
                Object.entries(data).map(([id, turnos]) => {
                  const medico = turnos[0];
                  return (
                    <div
                      key={id}
                      className="p-6 flex flex-col bg-card rounded-lg shadow-md"
                    >
                      <div className="flex flex-row items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserCircle size={24} className="text-gray-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">
                            Dr. {medico.nombre} {medico.apellido}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Especialidad: {medico.especialidad}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4 flex-grow mt-4">
                        <h4 className="font-medium">Horarios disponibles</h4>
                        <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-2">
                          {turnos.map((turno, index) => (
                            <Button
                              key={`${id}-${index}`}
                              variant="outline"
                              className="bg-secondary hover:bg-gray-100"
                            >
                              {turno.horario}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </>
    </AuthGuard>
  );
}
