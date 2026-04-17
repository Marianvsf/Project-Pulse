"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProjectCard from "../components/ProjectCard";
import UserNavbar from "../components/navbar/UserNavbar";
import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import Charts from "../components/Charts";
import useProjectStore, { Project } from "../../../store/useProjectStore";
import Image from "next/image";
import CreateProjectModal from "../views/CreateProjectModal";


export default function DashboardUser() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [greeting, setGreeting] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [editingStatus, setEditingStatus] = useState<string>("");
    const [isSavingStatus, setIsSavingStatus] = useState(false);
    const [statusUpdateError, setStatusUpdateError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const projectsSectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsMounted(true);
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Buenos días");
        else if (hour < 18) setGreeting("Buenas tardes");
        else setGreeting("Buenas noches");
    }, []);

    const galleryImages = [
        "/assets/fot1.jpg",
        "/assets/fot2.jpg",
        "/assets/fot3.jpg"
    ];

    const projects = useProjectStore((s) => s.projects);
    const searchTerm = useProjectStore((s) => s.searchTerm);
    const statusFilter = useProjectStore((s) => s.statusFilter);
    const setSearchTerm = useProjectStore((s) => s.setSearchTerm);
    const setStatusFilter = useProjectStore((s) => s.setStatusFilter);
    const setProjects = useProjectStore((s) => s.setProjects);
    const loadProjects = useProjectStore((s) => s.loadProjects);
    const isLoadingProjects = useProjectStore((s) => s.isLoading);
    const projectError = useProjectStore((s) => s.error);

    useEffect(() => {
        void loadProjects();
    }, [loadProjects]);

    // Efecto para la Galería (Slider automático)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [galleryImages.length]);

    const capitalize = (name?: string | null) => {
        if (!name) return undefined;
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const normalizeStatus = useCallback((status: string) => status.trim().toLowerCase(), []);

    const getStatusOptions = (currentStatus?: string) => {
        const baseOptions = ["Pendiente", "En progreso", "Completado"];
        if (currentStatus && !baseOptions.includes(currentStatus)) {
            return [currentStatus, ...baseOptions];
        }
        return baseOptions;
    };

    const startEditingStatus = (project: Project) => {
        setEditingProjectId(project.id);
        setEditingStatus(project.estado);
        setStatusUpdateError(null);
    };

    const cancelEditingStatus = () => {
        setEditingProjectId(null);
        setEditingStatus("");
        setStatusUpdateError(null);
    };

    const saveProjectStatus = async (projectId: string) => {
        setIsSavingStatus(true);
        setStatusUpdateError(null);

        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ estado: editingStatus }),
            });

            const data = (await response.json()) as {
                message?: string;
                project?: Project;
            };

            if (!response.ok || !data.project) {
                throw new Error(data.message || "No se pudo actualizar el estado");
            }

            const updatedProject: Project = {
                ...data.project,
                tareas: Array.isArray(data.project.tareas) ? data.project.tareas : [],
                equipo: Array.isArray(data.project.equipo) ? data.project.equipo : [],
            };

            setProjects(
                projects.map((project) =>
                    project.id === projectId ? updatedProject : project,
                ),
            );
            setEditingProjectId(null);
            setEditingStatus("");
        } catch (error) {
            setStatusUpdateError(
                error instanceof Error ? error.message : "No se pudo actualizar el estado",
            );
        } finally {
            setIsSavingStatus(false);
        }
    };

    const handleSearch = useCallback((searchTerm: string, filters: { status?: string }) => {
        setSearchTerm(searchTerm);
        setStatusFilter(filters.status);
    }, [setSearchTerm, setStatusFilter]);

    const applyStatusAndFocusProjects = useCallback((status?: string) => {
        setSearchTerm("");
        setStatusFilter(status);
        projectsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [setSearchTerm, setStatusFilter]);

    const Allprojects = useMemo(() => {
        let filtered = projects as Project[];
        if (statusFilter) {
            const normalizedFilter = normalizeStatus(statusFilter);
            filtered = filtered.filter((project) => normalizeStatus(project.estado) === normalizedFilter);
        }
        if (searchTerm) {
            filtered = filtered.filter((project: Project) =>
                project.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    }, [projects, searchTerm, statusFilter, normalizeStatus]);

    // Cálculo rápido de estadísticas
    const stats = useMemo(() => {
        const total = projects.length;
        const completados = projects.filter((p: Project) => normalizeStatus(p.estado) === "completado").length;
        const enProgreso = projects.filter((p: Project) => normalizeStatus(p.estado) === "en progreso").length;
        return { total, completados, enProgreso };
    }, [projects, normalizeStatus]);

    useEffect(() => {
        if (status !== "loading" && !session) {
            router.push("/login");
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin fill-blue-950" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    </svg>
                    <span className="text-slate-500 text-sm font-medium">Preparando tu espacio de trabajo...</span>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 selection:bg-orange-100 max-w-[1300px] mx-auto selection:text-orange-600">
            <UserNavbar onSearch={handleSearch} />

            <main className="container mx-auto px-4 lg:px-8 max-w-[1400px]">

                {/* --- SECCIÓN 1: BIENVENIDA --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-blue-950 mb-2 tracking-tight">
                            {isMounted ? greeting : " "},
                            <span className="text-[#FF7400]"> {capitalize(session.user?.name)}.</span>
                        </h1>
                        <p className="text-slate-600 max-w-2xl text-lg">
                            Bienvenido a tu panel. Aquí tienes el resumen de tus proyectos.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <span className="text-sm text-slate-400 font-medium">Hoy es un buen día para avanzar.</span>
                    </div>
                </div>

                {/* LAYOUT PRINCIPAL: GRID 2 COLUMNAS */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* --- COLUMNA IZQUIERDA (CONTENIDO PRINCIPAL) --- */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* TARJETAS DE ESTADÍSTICAS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                type="button"
                                onClick={() => applyStatusAndFocusProjects(undefined)}
                                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Total Proyectos</p>
                                    <h3 className="text-2xl font-bold text-blue-950">{stats.total}</h3>
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => applyStatusAndFocusProjects("En progreso")}
                                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">En Progreso</p>
                                    <h3 className="text-2xl font-bold text-blue-950">{stats.enProgreso}</h3>
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => applyStatusAndFocusProjects("Completado")}
                                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Completados</p>
                                    <h3 className="text-2xl font-bold text-blue-950">{stats.completados}</h3>
                                </div>
                            </button>
                        </div>

                        {/* GRÁFICAS */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-4 gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-blue-950 flex items-center gap-2">
                                        Análisis Visual
                                    </h2>
                                    <p className="text-slate-500 text-sm mt-1">
                                        Donde se concentra tu esfuerzo.
                                    </p>
                                </div>
                            </div>
                            <Charts projects={Allprojects} />
                        </div>

                        {/* LISTA DE PROYECTOS */}
                        <div ref={projectsSectionRef}>
                            <div className="mb-6">
                                <div className="flex items-center justify-between gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-blue-950">Galería de Proyectos</h2>
                                    <button
                                        onClick={() => setShowCreateModal(true)}
                                        className="px-4 py-2 rounded-full bg-[#FF7400] text-white text-sm font-semibold hover:bg-[#e46800] transition-colors"
                                    >
                                        Nuevo proyecto
                                    </button>
                                </div>
                                <p className="text-slate-600 max-w-3xl">
                                    Tus proyectos filtrados por búsqueda.
                                </p>
                            </div>

                            {projectError && (
                                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                    {projectError}
                                </div>
                            )}

                            {isLoadingProjects && (
                                <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
                                    Cargando proyectos desde la base de datos...
                                </div>
                            )}

                            {Allprojects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {Allprojects.map((project) => (
                                        <div key={project.id} className="group relative hover:-translate-y-1 transition-transform duration-300">
                                            <ProjectCard
                                                id={project.id}
                                                nombre={project.nombre}
                                                estado={project.estado}
                                                progreso={project.progreso}
                                                descripcion={project.descripcion}
                                                fechaFin={project.fechaFin}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => startEditingStatus(project)}
                                                className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100 transition-all hover:bg-blue-50 hover:text-blue-800"
                                            >
                                                Cambiar estado
                                            </button>

                                            {editingProjectId === project.id && (
                                                <div className="mt-3 rounded-2xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-100/50">
                                                    <div className="flex items-center justify-between gap-3 mb-3">
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-900">Editar estado</p>
                                                            <p className="text-xs text-slate-500">Ajuste rápido sin abrir el detalle.</p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={cancelEditingStatus}
                                                            className="text-xs font-semibold text-slate-400 hover:text-slate-600"
                                                        >
                                                            Cerrar
                                                        </button>
                                                    </div>

                                                    <select
                                                        value={editingStatus}
                                                        onChange={(event) => setEditingStatus(event.target.value)}
                                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        {getStatusOptions(project.estado).map((option) => (
                                                            <option key={option} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <div className="mt-3 flex items-center justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={cancelEditingStatus}
                                                            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
                                                        >
                                                            Cancelar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            disabled={isSavingStatus}
                                                            onClick={() => void saveProjectStatus(project.id)}
                                                            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                                        >
                                                            {isSavingStatus ? "Guardando..." : "Guardar"}
                                                        </button>
                                                    </div>

                                                    {statusUpdateError && (
                                                        <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                                                            {statusUpdateError}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 text-center px-4">
                                    <div className="bg-orange-50 p-4 rounded-full mb-4">
                                        <svg className="w-10 h-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-blue-950 mb-2">No encontramos coincidencias</h3>
                                    <button
                                        onClick={() => { setSearchTerm(""); setStatusFilter(undefined) }}
                                        className="px-6 py-2.5 bg-blue-950 text-white rounded-full font-medium hover:bg-blue-900 transition-colors"
                                    >
                                        Ver todos
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- COLUMNA DERECHA (SIDEBAR FIJO) --- */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">

                            {/* WIDGET 1: GALERÍA */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="font-bold text-blue-950">Inspiración</h3>
                                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">Nuevo</span>
                                </div>

                                <div className="relative h-[400px] w-full bg-slate-900 group">
                                    {galleryImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                                                }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`Arte ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        </div>
                                    ))}

                                    <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                                        <p className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">Colección 2024</p>
                                        <h4 className="text-lg font-bold leading-tight">Arte Digital & Creatividad</h4>
                                    </div>

                                    <div className="absolute top-4 right-4 flex gap-1.5">
                                        {galleryImages.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`h-1.5 w-1.5 rounded-full transition-all ${idx === currentSlide ? "bg-orange-500 scale-125" : "bg-white/50"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50">
                                    <p className="text-xs text-slate-500 text-center">
                                        &quot;La creatividad es la inteligencia divirtiéndose.&quot;
                                    </p>
                                </div>
                            </div>

                            {/* WIDGET 2: SOPORTE */}
                            <div className="bg-blue-950 rounded-2xl p-6 text-white shadow-lg">
                                <h3 className="font-bold text-lg mb-2">¿Necesitas ayuda?</h3>
                                <p className="text-blue-200 text-sm mb-4">Contacta con soporte técnico si tienes dudas con tu panel.</p>
                                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors border border-white/10">
                                    Contactar Soporte
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </main>

            {/* Renderizado condicional del modal externo */}
            {showCreateModal && (
                <CreateProjectModal onClose={() => setShowCreateModal(false)} />
            )}

        </div>
    );
}