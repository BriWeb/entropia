import {
  Search,
  Filter,
  UserPlus,
  FileText,
  Phone,
  Mail,
  UserCircle,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function PacientesPage() {
  // Datos de ejemplo para pacientes
  const pacientes = [
    {
      id: 1,
      nombre: "Juan Pérez",
      documento: "12345678",
      telefono: "555-1234",
      email: "juan.perez@ejemplo.com",
      fechaNacimiento: "15/03/1985",
      ultimaVisita: "10/05/2023",
    },
    {
      id: 2,
      nombre: "María García",
      documento: "23456789",
      telefono: "555-2345",
      email: "maria.garcia@ejemplo.com",
      fechaNacimiento: "22/07/1990",
      ultimaVisita: "05/05/2023",
    },
    {
      id: 3,
      nombre: "Carlos López",
      documento: "34567890",
      telefono: "555-3456",
      email: "carlos.lopez@ejemplo.com",
      fechaNacimiento: "10/11/1978",
      ultimaVisita: "01/05/2023",
    },
    {
      id: 4,
      nombre: "Ana Martínez",
      documento: "45678901",
      telefono: "555-4567",
      email: "ana.martinez@ejemplo.com",
      fechaNacimiento: "05/09/1995",
      ultimaVisita: "28/04/2023",
    },
    {
      id: 5,
      nombre: "Pedro Ramírez",
      documento: "56789012",
      telefono: "555-5678",
      email: "pedro.ramirez@ejemplo.com",
      fechaNacimiento: "18/12/1982",
      ultimaVisita: "25/04/2023",
    },
  ];

  // Datos de ejemplo para documentos
  const documentos = [
    {
      id: 1,
      pacienteId: 1,
      tipo: "Historia Clínica",
      fecha: "10/05/2023",
      estado: "Completo",
    },
    {
      id: 2,
      pacienteId: 1,
      tipo: "Análisis de Sangre",
      fecha: "05/05/2023",
      estado: "Pendiente",
    },
    {
      id: 3,
      pacienteId: 2,
      tipo: "Historia Clínica",
      fecha: "05/05/2023",
      estado: "Completo",
    },
    {
      id: 4,
      pacienteId: 2,
      tipo: "Radiografía",
      fecha: "03/05/2023",
      estado: "Completo",
    },
    {
      id: 5,
      pacienteId: 3,
      tipo: "Historia Clínica",
      fecha: "01/05/2023",
      estado: "Completo",
    },
    {
      id: 6,
      pacienteId: 4,
      tipo: "Historia Clínica",
      fecha: "28/04/2023",
      estado: "Completo",
    },
    {
      id: 7,
      pacienteId: 4,
      tipo: "Electrocardiograma",
      fecha: "28/04/2023",
      estado: "Completo",
    },
    {
      id: 8,
      pacienteId: 5,
      tipo: "Historia Clínica",
      fecha: "25/04/2023",
      estado: "Incompleto",
    },
  ];

  return (
    <AuthGuard>
      <div className="h-full mx-auto bg-secondary px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Pacientes</h1>
          <p className="text-gray-500">
            Gestiona la información de los pacientes
          </p>
        </div>

        {/* Filtros y acciones */}
        <div className="bg-secondary rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre, documento o email..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-secondary text-primary-700 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                <span>Filtrar</span>
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md text-white hover:bg-gray-700">
                <UserPlus className="h-4 w-4" />
                <span>Nuevo paciente</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lista de pacientes y documentos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de pacientes */}
          <div className="lg:col-span-1 bg-card rounded-lg shadow-md overflow-hidden">
            <div className="px-4 py-3 bg-card border-b border-gray-200">
              <h2 className="text-lg font-medium text-primary">Pacientes</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-auto">
              {pacientes.map((paciente) => (
                <div
                  key={paciente.id}
                  className="p-4 hover:bg-accent cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <UserCircle className="h-6 w-6 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {paciente.nombre}
                      </p>
                      <p className="text-sm truncate">
                        DNI: {paciente.documento}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                      <button className="p-1 rounded-full text-gray-400 hover:text-primary">
                        <Phone className="h-4 w-4" />
                      </button>
                      <button className="p-1 rounded-full text-gray-400 hover:text-primary">
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Información del paciente y documentos */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información del paciente */}
            <div className="bg-secondary rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <UserCircle className="h-10 w-10 text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      Juan Pérez
                    </h2>
                    <p className="text-sm">DNI: 12345678</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-secondary text-primary-700 text-sm hover:bg-gray-50">
                    Editar
                  </button>
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-gray-100 text-primary-700 text-sm hover:bg-gray-200">
                    Historial
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Información personal
                  </h3>
                  <dl className="mt-2 text-sm">
                    <div className="mt-1">
                      <dt className="inline text-gray-500">
                        Fecha de nacimiento:
                      </dt>
                      <dd className="inline ml-1">15/03/1985 (38 años)</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="inline text-gray-500">Género:</dt>
                      <dd className="inline ml-1">Masculino</dd>
                    </div>
                    <div className="mt-1">
                      <dt className="inline text-gray-500">Grupo sanguíneo:</dt>
                      <dd className="inline ml-1">A+</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Contacto
                  </h3>
                  <dl className="mt-2 text-sm">
                    <div className="mt-1 flex items-center">
                      <dt className="sr-only">Teléfono</dt>
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <dd>555-1234</dd>
                    </div>
                    <div className="mt-1 flex items-center">
                      <dt className="sr-only">Email</dt>
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <dd>juan.perez@ejemplo.com</dd>
                    </div>
                    <div className="mt-1 flex items-start">
                      <dt className="sr-only">Dirección</dt>
                      <svg
                        className="h-4 w-4 text-gray-400 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <dd>Calle Principal 123, Ciudad</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Documentos del paciente */}
            <div className="bg-secondary rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-3 bg-card border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium">
                  Documentos
                </h2>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200">
                  <FileText className="h-4 w-4" />
                  <span>Nuevo documento</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                      >
                        Tipo
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-secondary divide-y divide-gray-200">
                    {documentos
                      .filter((doc) => doc.pacienteId === 1)
                      .map((doc) => (
                        <tr key={doc.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {doc.tipo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {doc.fecha}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                doc.estado === "Completo"
                                  ? "bg-primary text-secondary"
                                  : doc.estado === "Pendiente"
                                  ? "bg-gray-200 text-gray-800"
                                  : "bg-gray-300 text-gray-800"
                              }`}
                            >
                              {doc.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-gray-600 hover:text-primary mr-3">
                              Ver
                            </button>
                            <button className="text-gray-600 hover:text-primary">
                              Descargar
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
