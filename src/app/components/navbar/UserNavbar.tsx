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

    // Cierre de menús al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (filterMenuRef.current && !filterMenuRef.current.contains(target)) setShowFilterMenu(false);
            if (menuRef.current && !menuRef.current.contains(target)) setShowProfileMenu(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showFilterMenu, showProfileMenu]);

    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
        <>
            <nav className="fixed top-4 inset-x-0 z-50 mx-4 lg:mx-auto max-w-7xl h-[72px] rounded-2xl border border-white/20 bg-slate-950/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300">
                <div className="flex items-center justify-between h-full px-4 lg:px-6">

                    {/* IZQUIERDA: Navegación y Buscador */}
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => router.back()}
                            className="p-2 text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all active:scale-90"
                            aria-label="Volver"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div className="relative w-9 h-9 hidden sm:block shrink-0">
                            <Image
                                fill
                                src="/Logo.png"
                                className="object-contain"
                                alt="Logo"
                            />
                        </div>

                        {/* Buscador Desktop */}
                        {showSearchAndFilter && (
                            <div className="hidden md:flex items-center gap-2 group">
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl w-[300px] lg:w-[400px] focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all">
                                    <Search size={18} className="text-white/40 group-focus-within:text-blue-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar proyectos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-transparent outline-none text-white text-sm placeholder:text-white/30 w-full"
                                    />
                                </div>

                                {/* Botón Filtro */}
                                <div className="relative" ref={filterMenuRef}>
                                    <button
                                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                                        className={`relative p-2.5 rounded-xl border transition-all active:scale-95 ${showFilterMenu || hasActiveFilters
                                            ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20"
                                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                                            }`}
                                    >
                                        <Filter size={20} />
                                        {hasActiveFilters && (
                                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-slate-900 rounded-full" />
                                        )}
                                    </button>

                                    {showFilterMenu && (
                                        <div className="absolute top-14 left-0 w-64 rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl p-2 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                                            <div className="px-3 py-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">Estado del Proyecto</div>

                                            {[
                                                { id: 'En progreso', icon: Activity, label: 'En progreso', color: 'text-amber-400' },
                                                { id: 'Completado', icon: CheckCircle2, label: 'Completado', color: 'text-emerald-400' },
                                                { id: 'Pendiente', icon: Clock, label: 'Pendiente', color: 'text-slate-400' }
                                            ].map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleFilterChange('status', item.id)}
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${filters.status === item.id ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                                                        }`}
                                                >
                                                    <item.icon size={16} className={item.color} />
                                                    {item.label}
                                                </button>
                                            ))}

                                            <div className="h-px bg-white/5 my-2" />
                                            <button
                                                onClick={clearFilters}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                                Borrar filtros
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* DERECHA: Perfil y Móvil */}
                    <div className="flex items-center gap-3">
                        {showSearchAndFilter && (
                            <button
                                onClick={() => setShowMobileSearch(true)}
                                className="md:hidden p-2.5 text-white/70 hover:bg-white/10 rounded-xl"
                            >
                                <Search size={22} />
                            </button>
                        )}

                        <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block" />

                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-3 pl-1 pr-1 sm:pr-2 py-1 rounded-full hover:bg-white/5 transition-all active:scale-95"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-violet-500 flex items-center justify-center border-2 border-white/10">
                                    <User size={20} className="text-white" />
                                </div>
                                <div className="text-left hidden lg:block">
                                    <p className="text-xs font-bold text-white leading-tight">
                                        {session?.user?.name || "Invitado"}
                                    </p>
                                    <p className="text-[10px] text-white/50 leading-tight truncate max-w-[120px]">
                                        {session?.user?.email || "Ver perfil"}
                                    </p>
                                </div>
                            </button>

                            {showProfileMenu && (
                                <div className="absolute top-14 right-0 w-56 rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl p-2 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-3 mb-2 lg:hidden border-b border-white/5">
                                        <p className="text-sm font-bold text-white">{session?.user?.name}</p>
                                        <p className="text-xs text-white/40 truncate">{session?.user?.email}</p>
                                    </div>
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

            {/* BÚSQUEDA MÓVIL FULLSCREEN-LIKE */}
            {showMobileSearch && (
                <div className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-md p-4 md:hidden animate-in fade-in duration-200">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Buscar</h2>
                            <button onClick={() => setShowMobileSearch(false)} className="p-2 text-white/60">
                                <X size={28} />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 border border-white/20 p-4 rounded-2xl">
                            <Search className="text-blue-400" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Nombre del proyecto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent outline-none text-white w-full text-lg"
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Filtrar por estado</p>
                            <div className="grid grid-cols-1 gap-2">
                                {['En progreso', 'Completado', 'Pendiente'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => { handleFilterChange('status', status); setShowMobileSearch(false); }}
                                        className={`p-4 rounded-xl border text-left transition-all ${filters.status === status ? 'bg-blue-600 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-white/70'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserNavbar;