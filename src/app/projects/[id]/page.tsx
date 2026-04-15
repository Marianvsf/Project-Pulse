"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";

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
  params: { id: string };
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const projectId = params?.id || '';
  return <ProjectDetailsClient projectId={projectId} />;
}

function ProjectDetailsClient({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${projectId}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Proyecto no encontrado");
        const data = await response.json();

        setProject({
          ...data.project,
          tareas: Array.isArray(data.project.tareas) ? data.project.tareas : [],
          equipo: Array.isArray(data.project.equipo) ? data.project.equipo : [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    if (projectId) loadProject();
  }, [projectId]);

  const formatDate = (s?: string) => {
    if (!s) return '--';
    const d = new Date(s);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getPriorityColor = (p: string) => {
    switch (p.toLowerCase()) {
      case 'alta': return 'bg-red-100 text-red-700 border-red-200';
      case 'media': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50/50">
      <UserNavbar onSearch={() => { }} showSearchAndFilter={false} />
      <div className="container mx-auto pt-32 px-4 animate-pulse">
        <div className="h-10 w-64 bg-slate-200 rounded-lg mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-slate-200 rounded-3xl" />
          <div className="h-96 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <UserNavbar onSearch={() => { }} showSearchAndFilter={false} />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-red-100 text-red-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Ups, algo salió mal</h2>
          <p className="text-slate-500 mb-6">{error}</p>
          <Link href="/projects" className="text-blue-600 font-semibold flex items-center justify-center gap-2 hover:underline">
            <ArrowLeft size={18} /> Volver a proyectos
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar onSearch={() => { }} showSearchAndFilter={false} />

      <main className="container mx-auto pt-32 pb-12 px-4 max-w-7xl">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <Link href="/projects" className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-sm mb-4 transition-colors w-fit">
            <ArrowLeft size={16} /> Volver a la lista
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(project.prioridad)}`}>
                  Prioridad {project.prioridad}
                </span>
                <span className="text-slate-400 select-none">•</span>
                <span className="text-blue-600 font-semibold text-sm flex items-center gap-1">
                  <Target size={14} /> {project.estado}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {project.nombre}
              </h1>
            </div>

            {/* Widget de Progreso Rápido */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase">Progreso Total</p>
                <p className="text-2xl font-black text-slate-800">{project.progreso}%</p>
              </div>
              <div className="w-16 h-16 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent"
                    strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * project.progreso) / 100}
                    className="text-blue-600 transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <span className="absolute text-[10px] font-bold text-blue-600">GO</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal (Izquierda) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Descripción Card */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ClipboardList size={22} className="text-blue-600" />
                Sobre el proyecto
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {project.descripcion}
              </p>
            </section>

            {/* Checklist de Tareas */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 size={22} className="text-emerald-500" />
                  Tareas del equipo
                </h2>
                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-lg">
                  {project.tareas.filter(t => t.completado).length}/{project.tareas.length} Completadas
                </span>
              </div>

              <div className="grid gap-3">
                {project.tareas.map((tarea) => (
                  <div key={tarea.id} className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all ${tarea.completado
                    ? 'bg-slate-50 border-transparent opacity-60'
                    : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'
                    }`}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${tarea.completado ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
                      }`}>
                      {tarea.completado && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <span className={`text-sm font-medium ${tarea.completado ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {tarea.nombre}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Columna Lateral (Derecha) */}
          <div className="space-y-6">

            {/* Card de Tiempos */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/10">
              <h3 className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-6">Cronograma</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-xl"><Calendar size={20} /></div>
                  <div>
                    <p className="text-xs text-white/50 font-medium">Fecha de Lanzamiento</p>
                    <p className="font-semibold">{formatDate(project.fechaInicio)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-xl"><Clock size={20} /></div>
                  <div>
                    <p className="text-xs text-white/50 font-medium">Fecha Límite</p>
                    <p className="font-semibold text-rose-400">{formatDate(project.fechaFin)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Equipo */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-slate-800 font-bold mb-6 flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                Equipo Asignado
              </h3>
              <div className="flex flex-col gap-3">
                {project.equipo.map((miembro, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {miembro.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{miembro}</span>
                    <ChevronRight size={14} className="ml-auto text-slate-300" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}