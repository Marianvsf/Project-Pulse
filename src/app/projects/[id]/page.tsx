"use client";

import { useEffect, useState, use, type ChangeEvent, type FormEvent } from "react";
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
  Target,
  PencilLine,
  Plus,
  Trash2,
  Save,
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

type TaskFormItem = {
  id: number;
  nombre: string;
  completado: boolean;
};

type ProjectFormState = {
  nombre: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  progreso: string;
  fechaInicio: string;
  fechaFin: string;
  equipo: string;
  tareas: TaskFormItem[];
};

const toDateInputValue = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const calculateProgressFromTasks = (tasks?: { completado: boolean }[]) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return null;
  }

  const completedTasks = tasks.filter((task) => task.completado).length;
  return Math.round((completedTasks / tasks.length) * 100);
};

const projectToFormState = (project: Project): ProjectFormState => ({
  nombre: project.nombre,
  descripcion: project.descripcion,
  estado: project.estado,
  prioridad: project.prioridad,
  progreso: String(calculateProgressFromTasks(project.tareas) ?? project.progreso ?? 0),
  fechaInicio: toDateInputValue(project.fechaInicio),
  fechaFin: toDateInputValue(project.fechaFin),
  equipo: Array.isArray(project.equipo) ? project.equipo.join(", ") : "",
  tareas: Array.isArray(project.tareas)
    ? project.tareas.map((task) => ({
      id: Number(task.id),
      nombre: task.nombre,
      completado: Boolean(task.completado),
    }))
    : [],
});

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
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectFormState | null>(null);

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

  useEffect(() => {
    if (project) {
      setFormData(projectToFormState(project));
    }
  }, [project]);

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => {
      if (!current) return current;
      return {
        ...current,
        [name]: value,
      };
    });
  };

  const updateTask = (taskId: number, field: keyof TaskFormItem, value: string | boolean) => {
    setFormData((current) => {
      if (!current) return current;

      const updatedTasks = current.tareas.map((task) =>
        task.id === taskId ? { ...task, [field]: value } : task,
      );
      const derivedProgress = calculateProgressFromTasks(updatedTasks);
      const fallbackProgress = Number(current.progreso) || 0;

      return {
        ...current,
        tareas: updatedTasks,
        progreso: String(derivedProgress ?? fallbackProgress),
      };
    });
  };

  const addTask = () => {
    setFormData((current) => {
      if (!current) return current;

      const nextTaskId =
        current.tareas.length > 0
          ? Math.max(...current.tareas.map((task) => task.id)) + 1
          : 1;
      const nextTasks = [...current.tareas, { id: nextTaskId, nombre: "", completado: false }];
      const derivedProgress = calculateProgressFromTasks(nextTasks);
      const fallbackProgress = Number(current.progreso) || 0;

      return {
        ...current,
        tareas: nextTasks,
        progreso: String(derivedProgress ?? fallbackProgress),
      };
    });
  };

  const removeTask = (taskId: number) => {
    setFormData((current) => {
      if (!current) return current;

      const updatedTasks = current.tareas.filter((task) => task.id !== taskId);
      const derivedProgress = calculateProgressFromTasks(updatedTasks);
      const fallbackProgress = Number(current.progreso) || 0;

      return {
        ...current,
        tareas: updatedTasks,
        progreso: String(derivedProgress ?? fallbackProgress),
      };
    });
  };

  const handleCancelEdit = () => {
    if (project) {
      setFormData(projectToFormState(project));
    }
    setSaveError(null);
    setIsEditing(false);
  };

  const handleSaveProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData) {
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const payload = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        estado: formData.estado,
        prioridad: formData.prioridad,
        progreso: calculateProgressFromTasks(formData.tareas) ?? (Number(formData.progreso) || 0),
        fechaInicio: formData.fechaInicio,
        fechaFin: formData.fechaFin,
        equipo: formData.equipo
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        tareas: formData.tareas
          .map((task) => ({
            id: task.id,
            nombre: task.nombre.trim(),
            completado: task.completado,
          }))
          .filter((task) => task.nombre.length > 0),
      };

      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        message?: string;
        project?: Project;
      };

      if (!response.ok || !data.project) {
        throw new Error(data.message || "No se pudo actualizar el proyecto");
      }

      const updatedProject: Project = {
        ...data.project,
        tareas: Array.isArray(data.project.tareas) ? data.project.tareas : [],
        equipo: Array.isArray(data.project.equipo) ? data.project.equipo : [],
      };

      setProject(updatedProject);
      setFormData(projectToFormState(updatedProject));
      setIsEditing(false);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "No se pudo actualizar el proyecto");
    } finally {
      setIsSaving(false);
    }
  };

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

  const capitalize = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '');

  const getAvatarGradient = (name: string) => {
    if (!name) return 'from-slate-400 to-slate-300';
    const palettes = [
      'from-indigo-400 to-purple-500',
      'from-rose-400 to-orange-400',
      'from-emerald-400 to-teal-500',
      'from-blue-400 to-cyan-400',
      'from-amber-400 to-rose-400',
    ];
    const idx = name.charCodeAt(0) % palettes.length;
    return palettes[idx];
  };

  const displayedProgress = (() => {
    const sourceTasks = isEditing && formData ? formData.tareas : project?.tareas ?? [];
    const progressFromTasks = calculateProgressFromTasks(sourceTasks);

    if (progressFromTasks !== null) {
      return progressFromTasks;
    }

    if (isEditing && formData) {
      return Number(formData.progreso) || 0;
    }

    return project?.progreso ?? 0;
  })();

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
                  Prioridad {capitalize(project.prioridad)}
                </span>
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">
                  <Target size={14} /> {project.estado}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                {project.nombre}
              </h1>
            </div>

            <div className="flex flex-col items-stretch gap-3">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50"
                >
                  <PencilLine size={16} />
                  Editar proyecto
                </button>
              ) : (
                <div className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm">
                  Modo edición activo
                </div>
              )}

              <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Actual</p>
                  <p className="text-3xl font-black text-slate-800 leading-none">{displayedProgress}%</p>
                </div>
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-slate-100" />
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="transparent"
                      strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * displayedProgress) / 100}
                      className="text-blue-600 transition-all duration-1000 ease-in-out" strokeLinecap="round" />
                  </svg>
                  <div className="absolute w-2 h-2 bg-blue-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {isEditing && formData && (
          <section className="mb-8 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-blue-100">
            <form onSubmit={handleSaveProject} className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Editar proyecto</h2>
                  <p className="text-sm text-slate-500 mt-1">Puedes modificar todos los datos desde este formulario.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-5 py-2.5 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSaving ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <Save size={16} />
                    )}
                    Guardar cambios
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                <div className="xl:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Nombre</label>
                  <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleFieldChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleFieldChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completado">Completado</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Prioridad</label>
                  <select
                    name="prioridad"
                    value={formData.prioridad}
                    onChange={handleFieldChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Progreso (%)</label>
                  <input
                    name="progreso"
                    type="number"
                    min={0}
                    max={100}
                    value={formData.progreso}
                    onChange={handleFieldChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Fecha de inicio</label>
                  <input
                    name="fechaInicio"
                    type="date"
                    value={formData.fechaInicio}
                    onChange={handleFieldChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Fecha límite</label>
                  <input
                    name="fechaFin"
                    type="date"
                    value={formData.fechaFin}
                    onChange={handleFieldChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Descripción</label>
                <textarea
                  name="descripcion"
                  rows={4}
                  value={formData.descripcion}
                  onChange={handleFieldChange}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <label className="block text-sm font-semibold text-slate-700">Equipo</label>
                  <span className="text-xs font-medium text-slate-400">Separado por comas</span>
                </div>
                <input
                  name="equipo"
                  value={formData.equipo}
                  onChange={handleFieldChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="block text-sm font-semibold text-slate-700">Tareas</label>
                  <button
                    type="button"
                    onClick={addTask}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800"
                  >
                    <Plus size={16} />
                    Añadir tarea
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.tareas.length > 0 ? (
                    formData.tareas.map((task) => (
                      <div key={task.id} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                        <input
                          type="checkbox"
                          checked={task.completado}
                          onChange={(event) => updateTask(task.id, "completado", event.target.checked)}
                          className="mt-3 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <input
                          value={task.nombre}
                          onChange={(event) => updateTask(task.id, "nombre", event.target.value)}
                          placeholder="Nombre de la tarea"
                          className={`flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 ${task.completado ? "border-emerald-200 bg-white text-slate-500 line-through" : "border-slate-200 bg-white text-slate-800"}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeTask(task.id)}
                          className="rounded-xl border border-transparent p-3 text-slate-400 transition-all hover:bg-white hover:text-rose-500"
                          aria-label="Eliminar tarea"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">
                      No hay tareas. Puedes añadir la primera con el botón superior.
                    </p>
                  )}
                </div>
              </div>

              {saveError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {saveError}
                </div>
              )}
            </form>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna Izquierda: Información y Tareas */}
          <div className="lg:col-span-2 space-y-8">

            {/* Tarjeta de Descripción */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <ClipboardList size={20} />
                </div>
                Descripción del Proyecto
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                {project.descripcion || (
                  <span className="text-slate-400 italic">Sin descripción del proyecto.</span>
                )}
              </p>
            </section>

            {/* Tarjeta de Tareas */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
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
          <aside className="space-y-6 lg:sticky lg:top-28">

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
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${getAvatarGradient(miembro)} text-white flex items-center justify-center font-black text-sm border border-white shadow-sm`}>
                      {miembro.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
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