"use client"

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProjectCard from "../components/ProjectCard";
import UserNavbar from "../components/navbar/UserNavbar";
import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import Charts from "../components/Charts";
import useProjectStore, { Project } from "../../../store/useProjectStore";
import Image from "next/image";
import CreateProjectModal from "../views/CreateProjectModal";
import EditStatusModal from "../views/EditStatusModal";
import LogoutConfirmModal from "../views/LogoutConfirmModal";
import SupportForm from "../components/SupportForm";

type ViewMode = "grid" | "list" | "detailed";

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
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showSupportForm, setShowSupportForm] = useState(false);
    const projectsSectionRef = useRef<HTMLDivElement | null>(null);

    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    useEffect(() => {
        setIsMounted(true);
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Buenos días");
        else if (hour < 18) setGreeting("Buenas tardes");
        else setGreeting("Buenas noches");
    }, []);

    // NUEVO: Efecto para cerrar el modal de soporte con "Escape" y bloquear el scroll de la página
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowSupportForm(false);
        };

        if (showSupportForm) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showSupportForm]);

    const galleryImages = [
        "/assets/fot1.jpg",
        "/assets/fot2.jpg",
        "/assets/fot3.jpg"
    ];

    const projects = useProjectStore((s) => s.projects);
    const searchTerm = useProjectStore((s) => s.searchTerm);
    const statusFilter = useProjectStore((s) => s.statusFilter);
    const priorityFilter = useProjectStore((s) => s.priorityFilter);
    const setSearchTerm = useProjectStore((s) => s.setSearchTerm);
    const setStatusFilter = useProjectStore((s) => s.setStatusFilter);
    const setPriorityFilter = useProjectStore((s) => s.setPriorityFilter);
    const setProjects = useProjectStore((s) => s.setProjects);
    const loadProjects = useProjectStore((s) => s.loadProjects);
    const isLoadingProjects = useProjectStore((s) => s.isLoading);
    const projectError = useProjectStore((s) => s.error);

    useEffect(() => {
        void loadProjects();
    }, [loadProjects]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [galleryImages.length]);

    const confirmLogout = useCallback(() => {
        setShowLogoutConfirm(false);
        setIsLoggingOut(true);
        void signOut({ callbackUrl: "/login" });
    }, []);

    const dismissLogout = useCallback(() => {
        setShowLogoutConfirm(false);
    }, []);

    const capitalize = (name?: string | null) => {
        if (!name) return undefined;
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const normalizeStatus = useCallback((status: string) => status.trim().toLowerCase(), []);

    const startEditingStatus = (project: Project) => {
        setEditingProjectId(project.id);
        setEditingStatus(project.estado);
        setStatusUpdateError(null);
    };

    const cancelEditingStatus = useCallback(() => {
        setEditingProjectId(null);
        setEditingStatus("");
        setStatusUpdateError(null);
    }, []);

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
            cancelEditingStatus();
        } catch (error) {
            setStatusUpdateError(
                error instanceof Error ? error.message : "No se pudo actualizar el estado",
            );
        } finally {
            setIsSavingStatus(false);
        }
    };

    const currentEditingProject = useMemo(
        () => projects.find((project) => project.id === editingProjectId) ?? null,
        [projects, editingProjectId],
    );

    const handleSearch = useCallback((searchTerm: string, filters: { status?: string; prioridad?: string }) => {
        setSearchTerm(searchTerm);
        setStatusFilter(filters.status);
        setPriorityFilter(filters.prioridad);
    }, [setSearchTerm, setStatusFilter, setPriorityFilter]);

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
        if (priorityFilter) {
            const normalizedFilter = normalizeStatus(priorityFilter);
            filtered = filtered.filter((project) => normalizeStatus(project.prioridad) === normalizedFilter);
        }
        if (searchTerm) {
            filtered = filtered.filter((project: Project) =>
                project.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    }, [projects, searchTerm, statusFilter, priorityFilter, normalizeStatus]);

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

    useEffect(() => {
        if (status !== "authenticated") return;

        const guardHistoryState = () => {
            window.history.pushState({ dashboardBackGuard: true }, "", window.location.href);
        };

        guardHistoryState();

        const handlePopState = () => {
            guardHistoryState();
            setShowLogoutConfirm(true);
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [status]);

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

    if (!session) return null;

    const getContainerClasses = () => {
        switch (viewMode) {
            case "list": return "flex flex-col gap-4";
            case "detailed": return "grid grid-cols-1 lg:grid-cols-2 gap-6";
            case "grid":
            default: return "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6";
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-50 pt-28 pb-12 selection:bg-orange-100 max-w-[1300px] mx-auto selection:text-orange-600">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#94a3b815_1px,transparent_1px),linear-gradient(to_bottom,#94a3b815_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
            <UserNavbar onSearch={handleSearch} />

            <main className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
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

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-8">
                        {/* TARJETAS DE ESTADÍSTICAS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button onClick={() => applyStatusAndFocusProjects(undefined)} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Total Proyectos</p>
                                    <h3 className="text-2xl font-bold text-blue-950">{stats.total}</h3>
                                </div>
                            </button>
                            <button onClick={() => applyStatusAndFocusProjects("En progreso")} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300">
                                <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">En Progreso</p>
                                    <h3 className="text-2xl font-bold text-blue-950">{stats.enProgreso}</h3>
                                </div>
                            </button>
                            <button onClick={() => applyStatusAndFocusProjects("Completado")} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300">
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
                                    <h2 className="text-xl font-bold text-blue-950 flex items-center gap-2">Análisis Visual</h2>
                                    <p className="text-slate-500 text-sm mt-1">Donde se concentra tu esfuerzo.</p>
                                </div>
                            </div>
                            <Charts projects={Allprojects} />
                        </div>

                        {/* LISTA DE PROYECTOS */}
                        <div ref={projectsSectionRef}>
                            <div className="mb-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-blue-950">Galería de Proyectos</h2>
                                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                        <div className="flex bg-gray-200 p-1 rounded-lg">
                                            <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white shadow text-blue-950' : 'text-slate-500 hover:text-slate-700'}`} title="Lista">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                            </button>
                                            <button onClick={() => setViewMode('grid')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'grid' ? 'bg-white shadow text-blue-950' : 'text-slate-500 hover:text-slate-700'}`} title="Cuadrícula">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                            </button>
                                            <button onClick={() => setViewMode('detailed')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'detailed' ? 'bg-white shadow text-blue-950' : 'text-slate-500 hover:text-slate-700'}`} title="Detalle">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                                            </button>
                                        </div>
                                        <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 rounded-full bg-[#FF7400] text-white text-sm font-semibold hover:bg-[#e46800] transition-colors whitespace-nowrap">
                                            Nuevo proyecto
                                        </button>
                                    </div>
                                </div>
                                <p className="text-slate-600 max-w-3xl">Tus proyectos filtrados por búsqueda.</p>
                            </div>

                            {projectError && (
                                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{projectError}</div>
                            )}

                            {isLoadingProjects && (
                                <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">Cargando proyectos desde la base de datos...</div>
                            )}

                            {Allprojects.length > 0 ? (
                                <div className={getContainerClasses()}>
                                    {Allprojects.map((project) => (
                                        <div key={project.id} className={`group relative hover:-translate-y-1 transition-transform duration-300 ${viewMode === 'list' ? 'flex items-center gap-4' : ''}`}>
                                            <div className="flex-1 w-full">
                                                <ProjectCard id={project.id} nombre={project.nombre} estado={project.estado} progreso={project.progreso} descripcion={project.descripcion} fechaFin={project.fechaFin} />
                                            </div>
                                            <button type="button" onClick={() => startEditingStatus(project)} className={`${viewMode === 'list' ? 'relative mt-0' : 'absolute left-5 top-40'} rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100 transition-all hover:bg-blue-50 hover:text-blue-800`}>
                                                Cambiar estado
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 text-center px-4">
                                    <div className="bg-orange-50 p-4 rounded-full mb-4">
                                        <svg className="w-10 h-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-blue-950 mb-2">No encontramos coincidencias</h3>
                                    <button onClick={() => { setSearchTerm(""); setStatusFilter(undefined) }} className="px-6 py-2.5 bg-blue-950 text-white rounded-full font-medium hover:bg-blue-900 transition-colors">
                                        Ver todos
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

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
                                        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
                                            <Image src={img} alt={`Arte ${index + 1}`} fill className="object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        </div>
                                    ))}
                                    <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                                        <p className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">Colección 2024</p>
                                        <h4 className="text-lg font-bold leading-tight">Arte Digital & Creatividad</h4>
                                    </div>
                                    <div className="absolute top-4 right-4 flex gap-1.5">
                                        {galleryImages.map((_, idx) => (
                                            <div key={idx} className={`h-1.5 w-1.5 rounded-full transition-all ${idx === currentSlide ? "bg-orange-500 scale-125" : "bg-white/50"}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50">
                                    <p className="text-xs text-slate-500 text-center">&quot;La creatividad es la inteligencia divirtiéndose.&quot;</p>
                                </div>
                            </div>

                            {/* WIDGET 2: SOPORTE */}
                            <div className="relative bg-[#050B14] rounded-2xl p-6 text-white shadow-lg overflow-hidden border border-white/5">
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                                <div className="absolute top-0 inset-x-0 flex justify-center pointer-events-none">
                                    <div className="w-3/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8),0_0_30px_rgba(34,211,238,0.4)]" />
                                </div>
                                <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[200px] h-[80px] bg-cyan-600/15 blur-[50px] rounded-full pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                        <span className="text-[10px] tracking-[0.3em] text-cyan-400/50 font-mono uppercase">Support</span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 text-white">¿Necesitas ayuda?</h3>
                                    <p className="text-slate-400 text-sm mb-4">Contacta con soporte técnico si tienes dudas con tu panel.</p>
                                    <button type="button" onClick={() => setShowSupportForm(true)} className="w-full py-2 bg-white/[0.03] hover:bg-cyan-500/10 rounded-lg text-sm font-medium transition-all border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] text-slate-300 hover:text-cyan-50">
                                        Contactar Soporte
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {showCreateModal && <CreateProjectModal onClose={() => setShowCreateModal(false)} />}

            {showSupportForm && (
                <div
                    className="fixed inset-0 z-[70] flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300 bg-slate-950/60"
                    onClick={() => setShowSupportForm(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="support-modal-title"
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8 animate-[fadeIn_0.2s_ease-out]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Elemento decorativo superior */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-[#FF7400]" />

                        <div className="mb-8 flex items-start justify-between gap-4 mt-2">
                            <div className="flex gap-4 items-start">
                                {/* Ícono temático */}
                                <div className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">Soporte Técnico</p>
                                    <h2 id="support-modal-title" className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                                        ¿En qué podemos ayudarte?
                                    </h2>
                                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                        Escribe los detalles de tu consulta. Prepararemos un correo electrónico con tu solicitud lista para ser enviada a nuestro equipo.
                                    </p>
                                </div>
                            </div>

                            {/* Botón circular con ícono X */}
                            <button
                                type="button"
                                onClick={() => setShowSupportForm(false)}
                                aria-label="Cerrar ventana de soporte"
                                className="rounded-full bg-slate-50 p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Contenedor sutil para integrar mejor el formulario */}
                        <div className="rounded-2xl bg-slate-50 p-2 sm:p-4 border border-slate-100">
                            <SupportForm
                                defaultName={session.user?.name ?? ""}
                                defaultEmail={session.user?.email ?? ""}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showLogoutConfirm && (
                <LogoutConfirmModal onConfirm={confirmLogout} onCancel={dismissLogout} />
            )}

            {isLoggingOut && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-slate-950/70 backdrop-blur-md">
                    <svg aria-hidden="true" className="w-10 h-10 text-gray-300 animate-spin fill-[#FF7400]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /></svg>
                    <p className="text-sm font-medium text-white/80">Cerrando sesión...</p>
                </div>
            )}

            {currentEditingProject && (
                <EditStatusModal
                    project={currentEditingProject}
                    value={editingStatus}
                    onChange={setEditingStatus}
                    onSave={() => void saveProjectStatus(currentEditingProject.id)}
                    onCancel={cancelEditingStatus}
                    isSaving={isSavingStatus}
                    error={statusUpdateError}
                />
            )}
        </div>
    );
}