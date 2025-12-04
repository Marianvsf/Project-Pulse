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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectDetailsPage({ params }: any) {
  const projectId = params?.id || '';
  return <ProjectDetailsClient projectId={projectId} />;
}

function ProjectDetailsClient({ projectId }: { projectId: string }) {
  const formatDate = (s?: string) => {
    if (!s) return '';
    const d = new Date(s);
    if (isNaN(d.getTime())) return s;
    const parts = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).split(' ');
    parts[1] = parts[1].replace('.', '');
    parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    return `${parts[0]} ${parts[1]} ${parts[2]}`;
  };
  // Busca el proyecto con el ID de la URL
  const project: Project | undefined = (projects as Project[]).find((p) => p.id === projectId);

  if (!project) {
    return <div>Proyecto no encontrado.</div>;
  }

  const handleSearch = () => {
    // Esta función no se usará, pero es una prop obligatoria para UserNavbar
  };

  return (
    <>
      <UserNavbar onSearch={handleSearch} showSearchAndFilter={false} />
      <div className="container mx-auto p-8 max-w-[1200px]">
        <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 ">{project.nombre}</h1>
              <div className="text-sm text-gray-900 mt-1">Fecha de inicio: {formatDate(project.fechaInicio)}</div>
              <div className="text-sm text-gray-900 mt-1">Fecha de fin: {formatDate(project.fechaFin)}</div>
            </div>
            <span className="px-3 py-1 text-sm font-medium rounded-full text-white bg-blue-500">
              {project.estado}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-800 mb-4">{project.descripcion}</p>

          <div className="mb-6">
            <p className="font-semibold text-gray-900 ">Prioridad: <span className="font-normal">{project.prioridad}</span></p>
            <p className="font-semibold text-gray-900 ">Progreso:</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-blue-500"
                style={{ width: `${project.progreso}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 ">Tareas</h2>
            <ul className="list-disc list-inside space-y-1">
              {project.tareas.map((tarea) => (
                <li key={tarea.id} className={`${tarea.completado ? 'line-through text-gray-500' : 'text-gray-700 '}`}>
                  {tarea.nombre}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 ">Equipo</h2>
            <div className="flex flex-wrap gap-2">
              {project.equipo.map((miembro, index) => (
                <span key={index} className="px-4 py-1 rounded-full bg-gray-200 text-gray-800 ">
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