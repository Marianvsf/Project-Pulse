"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import projects from "../../data/projects.json";
import ProjectCard from "../components/ProjectCard";
import UserNavbar from "../components/navbar/UserNavbar";
import { useCallback, useState } from "react";
import Charts from "../components/Charts";

interface Project {
    id: string;
    nombre: string;
    descripcion: string;
    estado: string;
    prioridad: string;
    progreso: number;
    tareas: { id: number; nombre: string; completado: boolean }[];
    equipo: string[];
    fechaInicio: string;
    fechaFin: string;
}

export default function DashboardUser() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [Allprojects, setAllProjects] = useState(projects as Project[]);

    const handleSearch = useCallback((searchTerm: string, filters: { status?: string }) => {
        let filteredProjects = projects as Project[];
        if (filters.status) {
            filteredProjects = filteredProjects.filter(project => project.estado === filters.status);
        }
        if (searchTerm) {
            filteredProjects = filteredProjects.filter((project: Project) =>
                project.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setAllProjects(filteredProjects);
    }, []);

    if (status === 'loading') {

        return <p>Cargando...</p>;
    }

    if (!session) {
        // Redirige al usuario si no está autenticado
        router.push('/login');
        return null;
    }

    return (
        <>
            <UserNavbar onSearch={handleSearch} />
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-4 text-center">Dashboard de Gestión de Proyectos</h1>
                <p className="text-lg text-gray-600 text-center mb-8">
                    Bienvenido, {session.user?.name}. Aquí puedes ver un resumen de todos tus proyectos, monitorear su estado y revisar el progreso de cada uno.
                </p>
                <h2 className="text-2xl font-semibold mb-4 text-center mt-8">Análisis General</h2>
                <p className="text-lg text-gray-500 text-center mb-6">
                    Observa el estado de tus proyectos en un vistazo. Utiliza estos gráficos para tomar decisiones rápidas.
                </p>

                {/* Sección de gráficos (ejemplo conceptual) */}
                <Charts projects={Allprojects} />

                <div className="flex justify-between items-center mt-12 mb-6">
                    <h2 className="text-2xl font-semibold">Tus Proyectos</h2>
                    <p className="text-md text-gray-500">
                        Total de proyectos activos: <span className="font-bold text-gray-700">{Allprojects.length}</span>
                    </p>
                </div>
                <p className="text-lg text-gray-500 mb-6">
                    Explora y gestiona todos los proyectos asignados a tu cuenta. Haz clic en cualquier tarjeta para ver los detalles completos.
                </p>

                {/* Grid para las tarjetas de proyectos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Allprojects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            nombre={project.nombre}
                            estado={project.estado}
                            progreso={project.progreso}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}