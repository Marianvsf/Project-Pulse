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
                <h1 className="text-4xl font-bold mb-8 text-center">Dashboard de Proyectos</h1>
                <h1 className="text-2xl font-semi-bold py-3">Bienvenido, {session.user?.name}</h1>

                {/* Sección de gráficos (ejemplo conceptual) */}
                <Charts projects={Allprojects} />

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