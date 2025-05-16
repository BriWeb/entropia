import { Search, Filter, Calendar, Plus } from 'lucide-react';

export default function TurnosPage() {
    // Datos de ejemplo para los turnos
    const turnos = [
        { id: 1, fecha: '15/05/2023', hora: '09:00', paciente: 'Juan Pérez', doctor: 'Dr. Martínez', especialidad: 'Cardiología', estado: 'Confirmado' },
        { id: 2, fecha: '15/05/2023', hora: '10:30', paciente: 'María García', doctor: 'Dra. Rodríguez', especialidad: 'Pediatría', estado: 'Pendiente' },
        { id: 3, fecha: '15/05/2023', hora: '11:45', paciente: 'Carlos López', doctor: 'Dr. Sánchez', especialidad: 'Traumatología', estado: 'Cancelado' },
        { id: 4, fecha: '16/05/2023', hora: '09:15', paciente: 'Ana Martínez', doctor: 'Dra. González', especialidad: 'Dermatología', estado: 'Confirmado' },
        { id: 5, fecha: '16/05/2023', hora: '12:00', paciente: 'Pedro Ramírez', doctor: 'Dr. Fernández', especialidad: 'Oftalmología', estado: 'Pendiente' },
        { id: 6, fecha: '17/05/2023', hora: '14:30', paciente: 'Sofía Torres', doctor: 'Dra. López', especialidad: 'Ginecología', estado: 'Confirmado' },
        { id: 7, fecha: '17/05/2023', hora: '16:00', paciente: 'Miguel Díaz', doctor: 'Dr. Gutiérrez', especialidad: 'Neurología', estado: 'Pendiente' },
        { id: 8, fecha: '18/05/2023', hora: '10:00', paciente: 'Lucía Ortiz', doctor: 'Dra. Álvarez', especialidad: 'Cardiología', estado: 'Confirmado' },
    ];

    // Función para obtener color según estado
    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case 'Confirmado': return 'bg-gray-100 text-gray-800';
            case 'Pendiente': return 'bg-gray-200 text-gray-800';
            case 'Cancelado': return 'bg-gray-300 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Turnos</h1>
                <p className="text-gray-500">Administra los turnos de los pacientes</p>
            </div>

            {/* Filtros y acciones */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
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
                        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                            <span>Filtrar</span>
                        </button>
                        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                            <Calendar className="h-4 w-4" />
                            <span>Fecha</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                        <span className="text-sm text-gray-500">Mostrando {turnos.length} turnos</span>
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hora
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Paciente
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Doctor
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Especialidad
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
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
                                        {turno.doctor}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {turno.especialidad}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(turno.estado)}`}>
                                            {turno.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-gray-600 hover:text-gray-900 mr-4">Editar</button>
                                        <button className="text-gray-600 hover:text-gray-900">Cancelar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Paginación */}
            <div className="bg-white border-t border-gray-200 px-4 py-3 sm:px-6 mt-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Mostrando <span className="font-medium">1</span> a <span className="font-medium">8</span> de <span className="font-medium">20</span> resultados
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Anterior</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
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
                                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    2
                                </a>
                                <a
                                    href="#"
                                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    3
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Siguiente</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
