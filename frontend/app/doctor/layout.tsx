"use client" //


import NavBar from "@/components/general/NavBar" 
import { LayoutDashboard, UserCircle, Calendar, Settings, LogOut, Menu, X } from "lucide-react" 
import Link from "next/link" 
import { useState, useEffect } from "react" 

export default function DoctorLayout({
    children, 
}: {
    children: React.ReactNode
}) {
    // Acá guardo información sobre si el menú está abierto y si es celular o computadora
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Si el menú lateral está abierto
    const [isMobile, setIsMobile] = useState(false); // Si estoy en celular
    const [isClient, setIsClient] = useState(false); // Si estoy en el navegador
    
    // esto se ejecuta cuando la pagina carga la primera vez
    useEffect(() => {
        setIsClient(true);
        
        // esta funcion detecta si estoy en celular o computadora
        const checkScreenSize = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);
            setIsSidebarOpen(!isMobileView); // Si estoy en computadora, abro el menú automáticamente
        };
        
        // verifico al cargar la pagina
        checkScreenSize();
        
        // tambien verifico si el usuario cambia el tamaño de la ventana
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // esta funcion abre o cierra el menu lateral cuando hago click
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    return (
        <div className="flex min-h-screen">
            {/* este es el menu lateral (sidebar) */}
            {isClient && (
                <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                                md:translate-x-0 w-64 bg-secondary shadow-lg transition-all duration-300 
                                fixed md:fixed top-0 left-0 h-screen z-50 overflow-y-auto`}>
                    <div className="h-full flex flex-col bg-secondary">
                        {/* titulo del dashboard y boton para cerrar en celulares */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h1 className="text-xl font-bold">Dashboard</h1>
                            {isMobile && (
                                <button onClick={toggleSidebar} className="md:hidden">
                                    <X size={24} />
                                </button>
                            )}
                        </div>

                        {/* estos son los botones del menu principal */}
                        <div className="flex-1 p-4">
                            <nav className="space-y-2">
                                <Link href="/doctor/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                                    <LayoutDashboard size={20} />
                                    <span>Panel</span>
                                </Link>
                                <Link href="/doctor/perfil" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                                    <UserCircle size={20} />
                                    <span>Perfil</span>
                                </Link>
                                <Link href="/doctor/turnos" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                                    <Calendar size={20} />
                                    <span>Mis Turnos</span>
                                </Link>
                                <Link href="/doctor/configuracion" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                                    <Settings size={20} />
                                    <span>Configuración</span>
                                </Link>
                            </nav>
                        </div>

                        {/* aca esta el nombre del doctor y el boton para salir */}
                        <div className="p-4 border-t">
                            <div className="mb-4">
                                <p className="font-medium">Dr. Carlos Rodríguez</p>
                                <p className="text-sm text-gray-500">Cardiología</p>
                            </div>
                            <button className="flex items-center gap-2 p-2 w-full hover:bg-red-50 text-red-600 rounded-lg">
                                <LogOut size={20} />
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>
                    </div>
                </aside>
            )}
            
            {/* esta es la parte derecha donde va el contenido principal */}
            <div className="flex-1 flex flex-col w-full md:ml-64">
                {/* menu de hamburguesa en celulares */}
                <div className="bg-secondary shadow-sm sticky top-0 z-40">
                    <div className="flex items-center">
                        {isClient && isMobile && (
                            <button 
                                onClick={toggleSidebar} 
                                className="p-4 focus:outline-none"
                            >
                                <Menu size={24} />
                            </button>
                        )}
                        <NavBar />
                    </div>
                </div>
                {/* aca es donde se muestran las paginas como dashboard, perfil, etc. */}
                <main className="p-4 bg-gray-100 flex-1 transition-all duration-300 relative">
                    {/* esto es un fondo oscuro que le da efecto de que se cubre la pantalla */}
                    {isClient && isMobile && isSidebarOpen && (
                        <div 
                            className="absolute inset-0 bg-gray-600 opacity-75 z-30"
                            onClick={toggleSidebar}
                        ></div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    )
}
