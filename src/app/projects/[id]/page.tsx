"use client";

import UserNavbar from "@/app/components/navbar/UserNavbar";
import projects from "../../../data/projects.json";


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
const typedProjects: Project[] = projects;

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  // Busca el proyecto con el ID de la URL
  const project: Project | undefined = projects.find((p) => p.id === params.id);
  if (!project) {
    return <div>Proyecto no encontrado.</div>;
  };

  const handleSearch = () => {
    // Esta función no se usará, pero es una prop obligatoria
  };

  return (
    <>
      <UserNavbar onSearch={handleSearch} showSearchAndFilter={false} />
      <div className="container mx-auto p-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{project.nombre}</h1>
            <span className="px-3 py-1 text-sm font-medium rounded-full text-white bg-blue-500">
              {project.estado}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{project.descripcion}</p>

          <div className="mb-6">
            <p className="font-semibold text-gray-700 dark:text-gray-300">Prioridad: <span className="font-normal">{project.prioridad}</span></p>
            <p className="font-semibold text-gray-700 dark:text-gray-300">Progreso:</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="h-2.5 rounded-full bg-blue-500"
                style={{ width: `${project.progreso}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Tareas</h2>
            <ul className="list-disc list-inside space-y-1">
              {project.tareas.map((tarea) => (
                <li key={tarea.id} className={`${tarea.completado ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                  {tarea.nombre}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Equipo</h2>
            <div className="flex flex-wrap gap-2">
              {project.equipo.map((miembro, index) => (
                <span key={index} className="px-4 py-1 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {miembro}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}