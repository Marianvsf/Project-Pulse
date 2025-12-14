"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProjectCard from "../components/ProjectCard";
import UserNavbar from "../components/navbar/UserNavbar";
import { useCallback, useMemo, useState, useEffect } from "react";
import Charts from "../components/Charts";
import useProjectStore, { Project } from "../../../store/useProjectStore";
import Image from "next/image";

export default function DashboardUser() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [greeting, setGreeting] = useState("Hola");
    const [currentSlide, setCurrentSlide] = useState(0);
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

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Buenos días");
        else if (hour < 18) setGreeting("Buenas tardes");
        else setGreeting("Buenas noches");
    }, []);

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

    const handleSearch = useCallback((searchTerm: string, filters: { status?: string }) => {
        setSearchTerm(searchTerm);
        setStatusFilter(filters.status);
    }, [setSearchTerm, setStatusFilter]);

    const Allprojects = useMemo(() => {
        let filtered = projects as Project[];
        if (statusFilter) {
            filtered = filtered.filter((project) => project.estado === statusFilter);
        }
        if (searchTerm) {
            filtered = filtered.filter((project: Project) =>
                project.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    }, [projects, searchTerm, statusFilter]);

    // Cálculo rápido de estadísticas
    const stats = useMemo(() => {
        const total = projects.length;
        const completados = projects.filter((p: any) => p.estado === 'Completado').length;
        const enProgreso = projects.filter((p: any) => p.estado === 'En Progreso').length;
        return { total, completados, enProgreso };
    }, [projects]);

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
        router.push('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 selection:bg-orange-100 selection:text-orange-600">
            <UserNavbar onSearch={handleSearch} />

            <main className="container mx-auto px-4 lg:px-8 max-w-[1400px]">

                {/* --- SECCIÓN 1: BIENVENIDA --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-blue-950 mb-2 tracking-tight">
                            {greeting}, <span className="text-[#FF7400]">{capitalize(session.user?.name)}</span>
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
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Total Proyectos</p>
                                    <h3 className="text-2xl font-bold text-blue-950">{stats.total}</h3>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">En Progreso</p>
                                    <h3 className="text-2xl font-bold text-blue-950">{stats.enProgreso}</h3>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Completados</p>
                                    <h3 className="text-2xl font-bold text-blue-950">{stats.completados}</h3>
                                </div>
                            </div>
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
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-blue-950 mb-2">Galería de Proyectos</h2>
                                <p className="text-slate-600 max-w-3xl">
                                    Tus proyectos filtrados por búsqueda.
                                </p>
                            </div>

                            {Allprojects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {Allprojects.map((project) => (
                                        <div key={project.id} className="group hover:-translate-y-1 transition-transform duration-300">
                                            <ProjectCard
                                                id={project.id}
                                                nombre={project.nombre}
                                                estado={project.estado}
                                                progreso={project.progreso}
                                                descripcion={project.descripcion}
                                                fechaFin={project.fechaFin}
                                            />
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
                                        "La creatividad es la inteligencia divirtiéndose."
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
        </div>
    );
}