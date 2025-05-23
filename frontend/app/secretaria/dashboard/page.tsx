"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
// Traemos el contexto donde se guarda el usuario
import { useAuth } from "@/app/context/AuthContext";

export default function DashboardSecretaria() {
  // extraemos el usuario
  const { usuario } = useAuth();

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold">Bienvenido {usuario?.nombre} </h1>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            <div>
              <div className="p-6 h-[400px] flex flex-col bg-secondary rounded-lg shadow-md">
                <div className="flex flex-row items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserCircle size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Dr. Juan Perez</h3>
                    <p className="text-sm text-gray-500">
                      Especialidad: Cardiología
                    </p>
                  </div>
                </div>
                <div className="space-y-4 flex-grow mt-4">
                  <h4 className="font-medium">Horarios disponibles</h4>
                  <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[280px] pr-2">
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      9:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      9:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      10:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      10:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      11:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      11:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      12:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      12:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      13:00
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-6 h-[400px] flex flex-col bg-secondary rounded-lg shadow-md">
                <div className="flex flex-row items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserCircle size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Dra. María González</h3>
                    <p className="text-sm text-gray-500">
                      Especialidad: Pediatría
                    </p>
                  </div>
                </div>
                <div className="space-y-4 flex-grow mt-4">
                  <h4 className="font-medium">Horarios disponibles</h4>
                  <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[280px] pr-2">
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      8:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      8:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      9:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      9:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      14:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      14:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      15:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      15:30
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-6 h-[400px] flex flex-col bg-secondary rounded-lg shadow-md">
                <div className="flex flex-row items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserCircle size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Dr. Roberto Silva</h3>
                    <p className="text-sm text-gray-500">
                      Especialidad: Traumatología
                    </p>
                  </div>
                </div>
                <div className="space-y-4 flex-grow mt-4">
                  <h4 className="font-medium">Horarios disponibles</h4>
                  <div className="grid grid-cols-2 gap-2  overflow-y-auto max-h-[280px] pr-2">
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      10:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      10:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      11:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      11:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      16:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      16:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      17:00
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-6 h-[400px] flex flex-col bg-secondary rounded-lg shadow-md">
                <div className="flex flex-row items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserCircle size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Dra. Ana Martínez</h3>
                    <p className="text-sm text-gray-500">
                      Especialidad: Dermatología
                    </p>
                  </div>
                </div>
                <div className="space-y-4 flex-grow mt-4">
                  <h4 className="font-medium">Horarios disponibles</h4>
                  <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[280px] pr-2">
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      9:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      9:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      12:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      12:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      13:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      13:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      14:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      14:30
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-6 h-[400px] flex flex-col bg-secondary rounded-lg shadow-md">
                <div className="flex flex-row items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserCircle size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Dr. Carlos Ramírez</h3>
                    <p className="text-sm text-gray-500">
                      Especialidad: Oftalmología
                    </p>
                  </div>
                </div>
                <div className="space-y-4 flex-grow mt-2">
                  <h4 className="font-medium">Horarios disponibles</h4>
                  <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[280px] pr-2">
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      8:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      9:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      9:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      15:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      15:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      16:00
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      16:30
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-secondary hover:bg-gray-100"
                    >
                      17:00
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
