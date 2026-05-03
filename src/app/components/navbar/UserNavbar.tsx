"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
    ChevronLeft,
    Search,
    Filter,
    LogOut,
    User,
    X,
    CheckCircle2,
    Clock,
    Activity,
    Trash2
} from "lucide-react";

interface Filters {
    status?: string;
    category?: string;
}

interface UserNavbarProps {
    onSearch: (searchTerm: string, filters: Filters) => void;
    showSearchAndFilter?: boolean;
}

interface FilterContentProps {
    filters: Filters;
    onFilterChange: (key: keyof Filters, value: string) => void;
    onClear: () => void;
}

const UserNavbar = ({ onSearch, showSearchAndFilter = true }: UserNavbarProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [searchTerm, setSearchTerm] = useState("");
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filters, setFilters] = useState<Filters>({});
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const filterMenuRef = useRef<HTMLDivElement>(null);

    // Detectar scroll para hacer el nav más compacto
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        onSearch(searchTerm, filters);
    }, [searchTerm, filters, onSearch]);

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/login" });
    };

    const handleFilterChange = (key: keyof Filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setShowFilterMenu(false);
    };

    const clearFilters = () => {
        setFilters({});
        setShowFilterMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (filterMenuRef.current && !filterMenuRef.current.contains(target)) {
                setShowFilterMenu(false);
            }
            if (menuRef.current && !menuRef.current.contains(target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
        <>
            {/* Header actúa como contenedor fijo transparente */}
            <header className="fixed top-0 inset-x-0 z-50 flex justify-center p-4 pointer-events-none">
                <nav
                    className={`pointer-events-auto flex items-center w-full max-w-7xl transition-all duration-500 ease-out rounded-full border border-white/10 backdrop-blur-xl shadow-2xl
                    ${scrolled
                            ? "h-16 bg-[#0B1120]/80 px-3 sm:px-6 shadow-black/50"
                            : "h-20 bg-[#0B1120]/40 px-4 sm:px-8"
                        }`}
                >
                    <div className="flex items-center justify-between w-full h-full">

                        {/* IZQUIERDA: Back y Logo */}
                        <div className="flex items-center gap-2 md:gap-4 flex-none lg:w-64">
                            <button
                                onClick={() => router.back()}
                                className="p-2.5 text-white/70 bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/10 hover:text-white rounded-full transition-all active:scale-90"
                            >
                                <ChevronLeft size={20} strokeWidth={2.5} />
                            </button>

                            <div className="relative hidden w-9 h-9 sm:flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 transition-transform duration-300 hover:scale-105 hover:border-white/40">
                                <Image width={20} height={20} src="/Logo.png" className="object-contain" alt="Logo" />
                            </div>
                        </div>

                        {/* CENTRO: Buscador Desktop */}
                        {showSearchAndFilter && (
                            <div className="hidden lg:flex items-center justify-center flex-1 px-4">
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full w-full max-w-md focus-within:bg-white/10 focus-within:border-white/20 focus-within:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300">
                                    <Search size={18} className="text-white/40" />
                                    <input
                                        type="text"
                                        placeholder="Buscar proyectos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full text-sm text-white bg-transparent outline-none placeholder:text-white/30"
                                    />
                                </div>
                            </div>
                        )}

                        {/* DERECHA: Acciones y Perfil */}
                        <div className="flex items-center justify-end gap-2 md:gap-3 flex-none lg:w-64">
                            {showSearchAndFilter && (
                                <>
                                    {/* Lupa Móvil/Tablet */}
                                    <button
                                        onClick={() => setShowMobileSearch(true)}
                                        className="lg:hidden p-2.5 text-white/70 hover:bg-white/10 hover:text-white rounded-full transition-all active:scale-95"
                                    >
                                        <Search size={20} />
                                    </button>

                                    {/* Filtro Desktop */}
                                    <div className="hidden md:block relative" ref={filterMenuRef}>
                                        <button
                                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                                            className={`p-2.5 rounded-full border transition-all active:scale-95 ${hasActiveFilters
                                                    ? "bg-gradient-to-b from-blue-500 to-blue-600 border-blue-400/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                                                }`}
                                        >
                                            <Filter size={18} />
                                        </button>

                                        {/* Dropdown Filtros */}
                                        {showFilterMenu && (
                                            <div className="absolute top-[calc(100%+12px)] right-0 w-64 rounded-[24px] bg-[#0B1120]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-3 animate-in fade-in slide-in-from-top-2 origin-top">
                                                <FilterContent filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className="hidden w-px h-6 mx-1 md:block bg-white/10" />

                            {/* Perfil */}
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center gap-2 p-1 transition-all border border-transparent rounded-full hover:bg-white/5 hover:border-white/10 active:scale-95"
                                >
                                    <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-blue-600 to-violet-500 border border-white/20 shadow-inner">
                                        <User size={18} className="text-white" />
                                    </div>
                                    <div className="hidden text-left sm:block pr-2">
                                        <p className="text-xs font-semibold text-white/90 leading-tight truncate max-w-[100px]">
                                            {session?.user?.name || "Usuario"}
                                        </p>
                                    </div>
                                </button>

                                {/* Dropdown Perfil */}
                                {showProfileMenu && (
                                    <div className="absolute top-[calc(100%+12px)] right-0 w-52 rounded-[24px] bg-[#0B1120]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-3 animate-in fade-in slide-in-from-top-2 origin-top">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full gap-3 px-4 py-3.5 text-sm font-semibold text-red-400 transition-all rounded-[16px] hover:bg-red-500/10 hover:text-red-300 active:bg-red-500/20"
                                        >
                                            <LogOut size={18} />
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* BÚSQUEDA Y FILTROS MÓVIL (Overlay) */}
            {showMobileSearch && (
                <div className="fixed inset-0 z-[70] flex flex-col bg-[#0B1120]/95 backdrop-blur-3xl lg:hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="flex flex-col gap-6 max-w-2xl mx-auto pt-4">

                            {/* Cabecera Móvil */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold tracking-tight text-white">Búsqueda</h2>
                                <button
                                    onClick={() => setShowMobileSearch(false)}
                                    className="p-2.5 text-white/60 bg-white/5 border border-white/10 rounded-full active:scale-90 transition-transform"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Input Móvil */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-[24px] focus-within:bg-white/10 focus-within:border-white/20 transition-all">
                                    <Search className="text-white/40" size={20} />
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="¿Qué proyecto buscas?"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full text-base text-white bg-transparent outline-none placeholder:text-white/30"
                                    />
                                </div>

                                {/* Filtros Móvil */}
                                <div className="space-y-4 bg-white/5 border border-white/10 p-5 rounded-[24px]">
                                    <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest ml-1">
                                        Filtrar por estado
                                    </p>
                                    <div className="grid grid-cols-1 gap-1">
                                        <FilterContent
                                            filters={filters}
                                            onFilterChange={(k, v) => { handleFilterChange(k, v); setShowMobileSearch(false); }}
                                            onClear={clearFilters}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Componente extraído para reutilizar en Desktop y Móvil
const FilterContent = ({ filters, onFilterChange, onClear }: FilterContentProps) => (
    <div className="flex flex-col gap-1">
        {[
            { id: 'En progreso', icon: Activity, label: 'En progreso', color: 'text-amber-400' },
            { id: 'Completado', icon: CheckCircle2, label: 'Completado', color: 'text-emerald-400' },
            { id: 'Pendiente', icon: Clock, label: 'Pendiente', color: 'text-slate-400' }
        ].map((item) => (
            <button
                key={item.id}
                onClick={() => onFilterChange('status', item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-[16px] text-sm font-medium transition-all active:scale-[0.98] ${filters.status === item.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-300 border border-transparent hover:bg-white/5 hover:text-white'
                    }`}
            >
                <item.icon size={18} className={filters.status === item.id ? 'text-blue-400' : item.color} />
                {item.label}
            </button>
        ))}

        <div className="h-px bg-white/10 my-2 mx-2" />

        <button
            onClick={onClear}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[16px] text-sm font-semibold text-red-400 border border-transparent hover:bg-red-500/10 active:scale-[0.98] transition-all"
        >
            <Trash2 size={16} />
            Borrar filtros
        </button>
    </div>
);

export default UserNavbar;