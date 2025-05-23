"use client";

import { Search, Filter, Calendar, Plus } from "lucide-react";
import { Turno } from "@/types/turno";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import PaginationButton from "@/components/ui/paginationButton";
import { useEffect, useState } from "react";

export default function TurnosPage() {
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  interface TurnoResponse {
    count: number;
    rows: Turno[];
  }

  const { loading, data, error } = useFetch<TurnoResponse>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/turno?limit=${limit}&offset=${offset}`,
    requiredAuth: true, // indica que debe incluir a el usuario actual en los encabezados para autorizar
  });

  useEffect(() => {
    if (data) {
      console.log("Turnos obtenidos: ", data);
      setTotalPages(Math.ceil(data.count / limit));
      setCurrentPage(Math.floor(offset / limit) + 1);
    }
  }, [data, offset]);

  useEffect(() => {
    if (offset) {
      console.log("El offset está en: ", offset);
    }
  }, [offset]);

  // Función para obtener color según estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Asignado":
        return "bg-gray-100 text-gray-800";
      case "En atencion":
        return "bg-gray-200 text-gray-800";
      case "Finalizado":
        return "bg-gray-300 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Turnos</h1>
        <p className="text-gray-500">Administra los turnos de los pacientes</p>
      </div>

      {/* Filtros y acciones */}
      <div className="bg-secondary rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por paciente, doctor o especialidad..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-secondary text-primary-700 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filtrar</span>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-secondary text-primary-700 hover:bg-gray-50">
              <Calendar className="h-4 w-4" />
              <span>Fecha</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <span className="text-sm text-gray-500">
              Mostrando {data && data.count ? data.count : 0} turnos
            </span>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md text-white hover:bg-gray-700">
              <Plus className="h-4 w-4" />
              <span>Nuevo turno</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de turnos */}
      {data && data.count && (
        <>
          <div className="bg-secondary rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Hora
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Paciente
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Doctor
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Especialidad
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-secondary divide-y divide-gray-200">
                  {data.rows.map((turno) => (
                    <tr key={turno.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {turno.fecha}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {turno.horario}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {`${turno.nombre_paciente}  ${turno.apellido_paciente}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {`${turno.nombre_medico}  ${turno.apellido_medico}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {turno.especialista_en}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(
                            turno.estado_turno
                          )}`}
                        >
                          {turno.estado_turno}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-600 hover:text-gray-900 mr-4">
                          Editar
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginación */}
          <div className="bg-secondary border-t border-gray-200 px-4 py-3 sm:px-6 mt-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-primary-700">
                    Mostrando <span className="font-medium">{offset + 1}</span>{" "}
                    a{" "}
                    <span className="font-medium">
                      {Math.min(offset + limit, data.count)}
                    </span>{" "}
                    de <span className="font-medium">{data.count}</span>{" "}
                    resultados
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() =>
                        setOffset((prev) => Math.max(prev - limit, 0))
                      }
                      disabled={offset === 0}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-secondary text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Anterior</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const page = i + 1;
                      return (
                        <PaginationButton
                          key={page}
                          pageNumber={page}
                          isActive={page === currentPage}
                          onClick={() => setOffset((page - 1) * limit)}
                        />
                      );
                    })}
                    <button
                      onClick={() =>
                        setOffset((prev) =>
                          Math.min(prev + limit, (totalPages - 1) * limit)
                        )
                      }
                      disabled={offset + limit >= data.count}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-secondary text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Siguiente</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {loading && <Loading />}
      {error && <Error error={error} />}
    </div>
  );
}
