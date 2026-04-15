"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import UserNavbar from "@/app/components/navbar/UserNavbar";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  ClipboardList,
  Target
} from "lucide-react";

// --- Interfaces ---
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

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>;
}

// --- Componente Principal (Manejo de Params Next.js 15) ---
export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  return <ProjectDetailsClient projectId={projectId} />;
}

// --- Componente de Cliente (Lógica y Diseño) ---
function ProjectDetailsClient({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/projects/${projectId}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError("El proyecto solicitado no existe.");
            return;
          }
          throw new Error("Error al conectar con el servidor");
        }

        const data = await response.json();

        // Mapeo y validación de datos
        setProject({
          ...data.project,
          tareas: Array.isArray(data.project.tareas) ? data.project.tareas : [],
          equipo: Array.isArray(data.project.equipo) ? data.project.equipo : [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo cargar el proyecto");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const formatDate = (s?: string) => {
    if (!s) return '-- --';
    const d = new Date(s);
    if (isNaN(d.getTime())) return s;
    return d.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getPriorityStyle = (p: string) => {
    switch (p.toLowerCase()) {
      case 'alta': return 'bg-red-100 text-red-700 border-red-200';
      case 'media': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  // --- Estados de Carga (Skeleton) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <UserNavbar onSearch={() => { }} showSearchAndFilter={false} />
        <div className="container mx-auto pt-32 px-4 max-w-7xl animate-pulse">
          <div className="h-8 w-48 bg-slate-200 rounded-lg mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-slate-200 rounded-3xl" />
              <div className="h-96 bg-slate-200 rounded-3xl" />
            </div>
            <div className="h-[500px] bg-slate-200 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  // --- Estado de Error ---
  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-50">
        <UserNavbar onSearch={() => { }} showSearchAndFilter={false} />
        <div className="container mx-auto pt-40 px-4 flex flex-col items-center justify-center text-center">
          <div className="bg-red-100 text-red-600 p-6 rounded-full mb-6">
            <AlertTriangle size={48} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Proyecto no encontrado</h1>
          <p className="text-slate-500 mb-8 max-w-md">{error}</p>
          <Link href="/projects" className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all">
            <ArrowLeft size={18} /> Volver al listado
          </Link>
        </div>
      </div>
    );
  }

  // --- Vista Principal ---
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar onSearch={() => { }} showSearchAndFilter={false} />

      <main className="container mx-auto pt-32 pb-12 px-4 max-w-7xl">

        {/* Encabezado */}
        <header className="mb-10">
          <Link href="/projects" className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-sm mb-6 transition-colors w-fit group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver a la lista de proyectos
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${getPriorityStyle(project.prioridad)}`}>
                  Prioridad {project.prioridad}
                </span>
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">
                  <Target size={14} /> {project.estado}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                {project.nombre}
              </h1>
            </div>

            {/* Widget de Progreso */}
            <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Actual</p>
                <p className="text-3xl font-black text-slate-800 leading-none">{project.progreso}%</p>
              </div>
              <div className="w-16 h-16 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-slate-100" />
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent"
                    strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * project.progreso) / 100}
                    className="text-blue-600 transition-all duration-1000 ease-in-out" strokeLinecap="round" />
                </svg>
                <div className="absolute w-2 h-2 bg-blue-600 rounded-full" />
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna Izquierda: Información y Tareas */}
          <div className="lg:col-span-2 space-y-8">

            {/* Tarjeta de Descripción */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <ClipboardList size={20} />
                </div>
                Descripción del Proyecto
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                {project.descripcion}
              </p>
            </section>

            {/* Tarjeta de Tareas */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <CheckCircle2 size={20} />
                  </div>
                  Plan de Trabajo
                </h2>
                <div className="text-[11px] font-black bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full uppercase tracking-tighter">
                  {project.tareas.filter(t => t.completado).length} de {project.tareas.length} listas
                </div>
              </div>

              <div className="grid gap-4">
                {project.tareas.length > 0 ? project.tareas.map((tarea) => (
                  <div key={tarea.id} className={`group flex items-center gap-5 p-5 rounded-2xl border transition-all ${tarea.completado
                      ? 'bg-slate-50 border-transparent'
                      : 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5'
                    }`}>
                    <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 transition-colors ${tarea.completado ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200'
                      }`}>
                      {tarea.completado && <CheckCircle2 size={16} className="text-white" />}
                    </div>
                    <span className={`text-base font-semibold ${tarea.completado ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {tarea.nombre}
                    </span>
                  </div>
                )) : (
                  <p className="text-slate-400 text-center py-10 italic">No hay tareas asignadas aún.</p>
                )}
              </div>
            </section>
          </div>

          {/* Columna Derecha: Sidebar con Datos */}
          <aside className="space-y-6">

            {/* Card de Tiempo (Negra) */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all" />
              <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8">Cronograma</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-white/5 rounded-2xl text-blue-400 border border-white/5">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 font-black uppercase mb-1">Fecha de Inicio</p>
                    <p className="text-lg font-bold">{formatDate(project.fechaInicio)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-white/5 rounded-2xl text-rose-400 border border-white/5">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 font-black uppercase mb-1">Fecha Límite</p>
                    <p className="text-lg font-bold text-rose-100">{formatDate(project.fechaFin)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Equipo */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
              <h3 className="text-slate-800 font-bold mb-8 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Users size={20} />
                </div>
                Equipo del Proyecto
              </h3>
              <div className="space-y-4">
                {project.equipo.length > 0 ? project.equipo.map((miembro, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-[1.25rem] transition-all group cursor-default">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 flex items-center justify-center font-black text-sm border border-white shadow-sm">
                      {miembro.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{miembro}</span>
                    <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-blue-400 transition-all" />
                  </div>
                )) : (
                  <p className="text-slate-400 text-sm text-center py-4">Sin miembros asignados.</p>
                )}
              </div>
            </div>

          </aside>
        </div>
      </main>
    </div>
  );
}