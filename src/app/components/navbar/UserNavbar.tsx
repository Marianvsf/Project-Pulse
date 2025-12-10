"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useSession } from "next-auth/react";

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
    const [showMobileSearch, setShowMobileSearch] = useState(false); // Estado para búsqueda móvil

    const menuRef = useRef<HTMLDivElement>(null);
    const filterMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onSearch(searchTerm, filters);
    }, [searchTerm, filters, onSearch]);

    const capitalize = (name?: string | null) => {
        if (!name) return undefined;
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const handleLogout = async () => {
        // await logout(); 
        router.push("/login");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (key: keyof Filters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        setShowFilterMenu(false);
    };

    const clearFilters = () => {
        setFilters({});
    };

    // Cerrar menús al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
                setShowFilterMenu(false);
            }
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false);
            }
        };
        if (showFilterMenu || showProfileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFilterMenu, showProfileMenu]);

    return (
        <>
            {/* CONTENEDOR PRINCIPAL ESTILO "ISLA DE CRISTAL" */}
            <nav className="fixed top-4 inset-x-0 z-50 mx-4 lg:mx-auto max-w-7xl h-[72px] rounded-[16px] border border-white/10 bg-blue-950/50 backdrop-blur-md shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between h-full px-4 lg:px-6">

                    {/* SECCIÓN IZQUIERDA: Back + Logo + Search */}
                    <div className="flex items-center gap-3">
                        {/* Botón de Volver */}
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center justify-center p-1.5 text-white/70 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Logo */}
                        <div className="relative overflow-hidden rounded-full border border-white/10 hidden sm:block">
                            <Image
                                width={36}
                                height={36}
                                src="/Logo.png"
                                className="object-cover"
                                alt="Logo"
                            />
                        </div>

                        {/* Buscador + Filtro (Desktop) */}
                        {showSearchAndFilter && (
                            <div className="hidden md:flex items-center gap-2 ml-2">
                                <div className="flex items-center gap-2 bg-blue-950/40 border border-white/10 px-4 py-2 rounded-[8px] w-[280px] lg:w-[320px] focus-within:bg-white/10 focus-within:border-white/20 transition-colors">
                                    <Image width={16} height={16} src="/search.svg" alt="Buscar" className="w-4 h-4 opacity-70" />
                                    <input
                                        type="text"
                                        placeholder="Buscar proyectos..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="bg-transparent outline-none text-white text-sm placeholder:text-white/50 w-full"
                                    />
                                </div>

                                {/* Botón Filtro */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                                        className={`w-9 h-9 flex items-center justify-center rounded-md border transition-colors ${showFilterMenu || Object.keys(filters).length > 0
                                            ? "bg-white/20 border-white/30"
                                            : "bg-blue-950/40 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        <Image width={16} height={16} src="/filter.svg" alt="Filtrar" className="w-4 h-4" />
                                    </button>

                                    {/* Dropdown de Filtros */}
                                    {showFilterMenu && (
                                        <div ref={filterMenuRef} className="absolute top-[48px] left-0 w-[200px] rounded-[12px] bg-blue-950/70 border border-white/10 shadow-2xl p-3 z-50 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <p className="font-semibold text-xs uppercase tracking-wider text-gray-400 px-1">Estado</p>
                                            {['En progreso', 'Completado', 'Pendiente'].map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => handleFilterChange('status', status)}
                                                    className={`px-3 py-2 rounded-md text-sm text-left transition-colors ${filters.status === status
                                                        ? 'bg-blue-950/70 text-white'
                                                        : 'text-gray-300 hover:bg-white/20'
                                                        }`}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                            <div className="h-px bg-white/10 my-1" />
                                            <button
                                                onClick={clearFilters}
                                                className="px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                                            >
                                                Quitar filtros
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Botón búsqueda móvil (Lupa sola) */}
                        {showSearchAndFilter && (
                            <button
                                onClick={() => setShowMobileSearch(!showMobileSearch)}
                                className="md:hidden p-2 text-white/80 hover:text-white"
                            >
                                <Image width={18} height={18} src="/search.svg" alt="Buscar" />
                            </button>
                        )}
                    </div>

                    {/* SECCIÓN DERECHA: User Info + Profile */}
                    <div className="flex items-center gap-4 relative">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-white">
                                {capitalize(session?.user?.name) ?? "Invitado"}
                            </p>
                            <p className="text-xs text-white/60">
                                {session?.user?.email ?? ""}
                            </p>
                        </div>

                        {/* Botón de perfil */}
                        <div className="relative">
                            <button
                                className="w-9 h-9 rounded-full hover:bg-white/10 p-[1px]"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >
                                <div className="w-full h-full rounded-full bg-blue-950/50 flex items-center justify-center hover:bg-transparent transition-colors">
                                    {/* Si tienes imagen de usuario real, úsala aquí, sino el icono */}
                                    <Image width={16} height={16} src="/user.svg" alt="Perfil" className="w-4 h-4 " />
                                </div>
                            </button>

                            {/* Dropdown de perfil */}
                            {showProfileMenu && (
                                <div
                                    ref={menuRef}
                                    className="absolute top-[48px] right-0 w-[240px] rounded-[16px] bg-blue-950/70 border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                                >
                                    <div className="p-3 border-b border-white/10 mb-2 sm:hidden">
                                        <p className="text-white font-medium">{capitalize(session?.user?.name) ?? "Invitado"}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                                    >
                                        <Image width={18} height={18} src="/log-out.png" alt="Salir" className="opacity-80" />
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* BARRA DE BÚSQUEDA MÓVIL (Fuera del nav para no romper el layout) */}
            {showMobileSearch && showSearchAndFilter && (
                <div className="fixed top-[90px] inset-x-4 z-40 md:hidden animate-in fade-in slide-in-from-top-2">
                    <div className="bg-blue-950/50 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl flex gap-2">
                        <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
                            <Image width={16} height={16} src="/search.svg" alt="Buscar" className="opacity-50" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                autoFocus
                                className="bg-transparent outline-none text-white text-sm w-full placeholder:text-white/30"
                            />
                        </div>
                        <button
                            onClick={() => setShowMobileSearch(false)}
                            className="text-white/60 text-sm px-2 font-medium"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserNavbar;