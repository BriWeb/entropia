import { Search, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthGuard from "@/components/auth/AuthGuard";

export default function TurnosDoctor() {
  // datos de ejemplo para los turnos, despues se agrega de la base de datos
  const turnos = [
    {
      id: 1,
      fecha: "15/05/2023",
      hora: "09:00",
      paciente: "Juan Pérez",
      estado: "Pendiente",
      notas: "Control mensual",
    },
    {
      id: 2,
      fecha: "15/05/2023",
      hora: "10:30",
      paciente: "María García",
      estado: "Pendiente",
      notas: "Primera consulta",
    },
    {
      id: 3,
      fecha: "16/05/2023",
      hora: "09:15",
      paciente: "Carlos López",
      estado: "Pendiente",
      notas: "Seguimiento post-operatorio",
    },
    {
      id: 4,
      fecha: "16/05/2023",
      hora: "11:45",
      paciente: "Ana Martínez",
      estado: "Pendiente",
      notas: "Control de rutina",
    },
    {
      id: 5,
      fecha: "17/05/2023",
      hora: "14:30",
      paciente: "Pedro Ramírez",
      estado: "Pendiente",
      notas: "Revisión de estudios",
    },
    {
      id: 6,
      fecha: "17/05/2023",
      hora: "16:00",
      paciente: "Sofía Torres",
      estado: "Pendiente",
      notas: "Primera consulta",
    },
    {
      id: 7,
      fecha: "18/05/2023",
      hora: "10:00",
      paciente: "Miguel Díaz",
      estado: "Pendiente",
      notas: "Control post-tratamiento",
    },
    {
      id: 8,
      fecha: "18/05/2023",
      hora: "12:00",
      paciente: "Lucía Ortiz",
      estado: "Pendiente",
      notas: "Revisión anual",
    },
  ];

  // funcion para obtener color segun el estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-gray-100 text-gray-800";
      case "Atendido":
        return "bg-gray-300 text-gray-800";
      case "Cancelado":
        return "bg-gray-100 text-gray-500";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Mis Turnos</h1>
          <p className="text-gray-500">
            Gestiona tus turnos y consultas programadas
          </p>
        </div>

        {/* filtros y acciones */}
        <div className="bg-secondary rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre de paciente..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-secondary text-primary-700 hover:bg-gray-50">
                <Calendar className="h-4 w-4" />
                <span>Fecha</span>
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-secondary text-primary-700 hover:bg-gray-50">
                <Clock className="h-4 w-4" />
                <span>Horario</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <span className="text-sm text-gray-500">
                Mostrando {turnos.length} turnos programados
              </span>
            </div>
          </div>
        </div>

        {/* Tabla de turnos */}
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
                    Notas
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
                {turnos.map((turno) => (
                  <tr key={turno.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {turno.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {turno.hora}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {turno.paciente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {turno.notas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(
                          turno.estado
                        )}`}
                      >
                        {turno.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Button variant="outline" size="sm" className="mr-2">
                        Ver ficha
                      </Button>
                      <Button variant="outline" size="sm">
                        Reprogramar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginas del final */}
        <div className="bg-secondary border-t border-gray-200 px-4 py-3 sm:px-6 mt-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-primary-700">
                  Mostrando <span className="font-medium">1</span> a{" "}
                  <span className="font-medium">8</span> de{" "}
                  <span className="font-medium">8</span> resultados
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-secondary text-sm font-medium text-gray-500 hover:bg-gray-50"
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
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-gray-50 border-gray-500 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-secondary text-sm font-medium text-gray-500 hover:bg-gray-50"
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
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
