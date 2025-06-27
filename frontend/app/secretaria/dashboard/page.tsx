"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useFetch } from "@/hooks/useFetch";
// Traemos el contexto donde se guarda el usuario
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";

export default function DashboardSecretaria() {
  // extraemos el usuario
  const { usuario } = useAuth();
  const [horarioId, setHorarioId] = useState<number | null>(null);
  const [especialidadId, setEspecialidadId] = useState<number | null>(null);

  interface Turno {
    especialidad: string;
    nombre: string;
    apellido: string;
    horario: string;
  }

  interface HorariosPorProfesional {
    [id: string]: Turno[];
  }

  const queryParams = new URLSearchParams();

  if (horarioId) queryParams.append("horario_id", horarioId.toString());
  if (especialidadId)
    queryParams.append("especialidad_id", especialidadId.toString());

  const {
    loading: loadingToday,
    data: dataToday,
    error: errorToday,
  } = useFetch<HorariosPorProfesional>({
    url: `${
      process.env.NEXT_PUBLIC_API_URL
    }/medico/today?${queryParams.toString()}`,
    requiredAuth: true,
  });

  interface Especialidad {
    id: number;
    descripcion: string;
  }

  const {
    loading: loadingEspecialidades,
    data: dataEspecialidades,
    error: errorEspecialidades,
  } = useFetch<Especialidad[]>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/medico/especialidades`,
    requiredAuth: true,
  });

  interface Horarios {
    id: number;
    horario: string;
  }

  const {
    loading: loadingHorarios,
    data: dataHorarios,
    error: errorHorarios,
  } = useFetch<Horarios[]>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/turno/horarios`,
    requiredAuth: true,
  });

  useEffect(() => {
    if (dataHorarios) {
      console.log("Horarios obtenidos: ", dataHorarios);
    }
  }, [dataHorarios]);

  return (
    <AuthGuard>
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="bg-secondary p-6 rounded-lg shadow-md">
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
                {loadingEspecialidades && <Loading />}
                {errorEspecialidades && <Error error={errorEspecialidades} />}
                <select
                  className="w-full border border-gray-300 rounded-md p-2 bg-secondary"
                  name="especialidad"
                  id="especialidad"
                  onChange={(e) => {
                    const selected = parseInt(e.target.value);
                    setEspecialidadId(isNaN(selected) ? null : selected);
                  }}
                >
                  <option value="">Todos</option>{" "}
                  {/* Opción para limpiar filtro */}
                  {dataEspecialidades &&
                    dataEspecialidades.map((e) => {
                      return (
                        <option value={e.id} key={e.id}>
                          {e.descripcion}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="w-full  rounded-md ">
                <label className="text-md  text-gray-500" htmlFor="horario">
                  Horario
                </label>
                {loadingHorarios && <Loading />}
                {errorHorarios && <Error error={errorHorarios} />}
                <select
                  className="w-full border border-gray-300 rounded-md p-2 bg-secondary"
                  name="horario"
                  id="horario"
                  onChange={(e) => {
                    const selected = parseInt(e.target.value);
                    setHorarioId(isNaN(selected) ? null : selected);
                  }}
                >
                  <option value="">Todos</option>{" "}
                  {/* Opción para limpiar filtro */}
                  {dataHorarios &&
                    dataHorarios.map((e) => {
                      return (
                        <option value={e.id} key={e.id}>
                          {e.horario}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            {loadingToday && <Loading />}
            {errorToday && <Error error={errorToday} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              {dataToday &&
                Object.entries(dataToday).map(([id, turnos]) => {
                  const medico = turnos[0];
                  return (
                    <div
                      key={id}
                      className="p-6 flex flex-col bg-secondary rounded-lg shadow-md"
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
      </div>
    </AuthGuard>
  );
}
