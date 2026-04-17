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

    const menuRef = useRef<HTMLDivElement>(null);
    const filterMenuRef = useRef<HTMLDivElement>(null);

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
            <nav className="fixed top-4 inset-x-0 z-50 mx-4 lg:mx-auto max-w-7xl h-16 md:h-[72px] rounded-2xl border border-white/20 bg-slate-950/60 backdrop-blur-xl shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between h-full px-3 md:px-6">

                    {/* IZQUIERDA: Back y Logo */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all active:scale-90"
                        >
                            <ChevronLeft size={22} />
                        </button>

                        <div className="relative w-8 h-8 hidden lg:block shrink-0">
                            <Image fill src="/Logo.png" className="object-contain" alt="Logo" />
                        </div>
                    </div>

                    {/* CENTRO: Buscador Desktop (Solo visible en LG+) */}
                    {showSearchAndFilter && (
                        <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md px-4">
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl w-full focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                                <Search size={18} className="text-white/40" />
                                <input
                                    type="text"
                                    placeholder="Buscar proyectos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent outline-none text-white text-sm placeholder:text-white/30 w-full"
                                />
                            </div>
                        </div>
                    )}

                    {/* DERECHA: Acciones y Perfil */}
                    <div className="flex items-center gap-1 md:gap-3">
                        {showSearchAndFilter && (
                            <>
                                {/* Icono lupa - visible hasta LG */}
                                <button
                                    onClick={() => setShowMobileSearch(true)}
                                    className="lg:hidden p-2.5 text-white/70 hover:bg-white/10 rounded-xl"
                                >
                                    <Search size={20} />
                                </button>

                                {/* Filtro Desktop - Oculto en móviles (se mueve al modal de búsqueda) */}
                                <div className="hidden md:block relative" ref={filterMenuRef}>
                                    <button
                                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                                        className={`p-2.5 rounded-xl border transition-all ${hasActiveFilters ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-white/70"
                                            }`}
                                    >
                                        <Filter size={20} />
                                    </button>

                                    {showFilterMenu && (
                                        <div className="absolute top-14 right-0 w-64 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl p-2 animate-in fade-in zoom-in-95">
                                            {/* Contenido del filtro igual al tuyo */}
                                            <FilterContent filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="h-6 w-px bg-white/10 mx-1 hidden md:block" />

                        {/* Perfil */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5 transition-all"
                            >
                                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-blue-600 to-violet-500 flex items-center justify-center border border-white/20">
                                    <User size={18} className="text-white" />
                                </div>
                                <div className="text-left hidden sm:block">
                                    <p className="text-xs font-bold text-white leading-tight truncate max-w-[80px]">
                                        {session?.user?.name || "Usuario"}
                                    </p>
                                </div>
                            </button>

                            {showProfileMenu && (
                                <div className="absolute top-14 right-0 w-52 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl p-2 animate-in fade-in slide-in-from-top-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm font-semibold"
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

            {/* BÚSQUEDA MÓVIL OPTIMIZADA */}
            {showMobileSearch && (
                <div className="fixed inset-0 z-[70] bg-slate-950 p-4 lg:hidden animate-in slide-in-from-bottom-5 duration-300">
                    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Búsqueda y Filtros</h2>
                            <button onClick={() => setShowMobileSearch(false)} className="p-2 text-white/60 bg-white/5 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl focus-within:ring-2 ring-blue-500">
                                <Search className="text-blue-400" size={20} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="¿Qué proyecto buscas?"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent outline-none text-white w-full text-base"
                                />
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Filtrar por estado</p>
                                <div className="grid grid-cols-1 gap-2">
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
            )}
        </>
    );
};

// Subcomponente para no repetir el contenido de los filtros
const FilterContent = ({ filters, onFilterChange, onClear }: FilterContentProps) => (
    <>
        {[
            { id: 'En progreso', icon: Activity, label: 'En progreso', color: 'text-amber-400' },
            { id: 'Completado', icon: CheckCircle2, label: 'Completado', color: 'text-emerald-400' },
            { id: 'Pendiente', icon: Clock, label: 'Pendiente', color: 'text-slate-400' }
        ].map((item) => (
            <button
                key={item.id}
                onClick={() => onFilterChange('status', item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${filters.status === item.id ? 'bg-blue-600 text-white' : 'text-white/60 hover:bg-white/5'
                    }`}
            >
                <item.icon size={18} className={filters.status === item.id ? 'text-white' : item.color} />
                {item.label}
            </button>
        ))}
        <div className="h-px bg-white/5 my-2" />
        <button
            onClick={onClear}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
        >
            <Trash2 size={18} />
            Borrar filtros
        </button>
    </>
);

export default UserNavbar;