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
    const { data: session, status } = useSession();
    const [searchTerm, setSearchTerm] = useState("");
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filters, setFilters] = useState<Filters>({});
    const menuRef = useRef(null);
    const filterMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onSearch(searchTerm, filters);
    }, [searchTerm, filters, onSearch]);

    const capitalize = (name?: string | null) => {
        if (!name) return undefined;
        return name.charAt(0).toUpperCase() + name.slice(1);
    };
    const [showMobileSearch, setShowMobileSearch] = useState(false);

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
                setShowFilterMenu(false);
            }
        };
        if (showFilterMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFilterMenu]);

    return (
        <div className="flex justify-between items-center w-full bg-gray-900 border-gray-800 px-6 py-4">
            {/* Sección Izquierda: Botón de Volver y Buscador */}
            <div className="flex items-center gap-2">
                {/* Botón de Volver */}
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center text-gray-400 rounded-xl hover:bg-gray-500 dark:hover:bg-gray-500"
                ><ChevronLeftIcon className="h-8 w-8 mr-1" aria-hidden="true" />
                </button>
                <Image width={40} height={40} src="/Logo.png" className="rounded-full bg-gray-500" alt="Logo" />
                {/* Buscador + Filtro */}
                {showSearchAndFilter && (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-white border border-gray-700 dark:bg-gray-900 dark:border-gray-800] px-4 py-2 rounded-[8px] w-[320px]">
                            <Image width={4} height={4} src="/search.svg" alt="Buscar" className="w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar proyectos..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="bg-transparent outline-none text-white text-sm placeholder:text-[#999] w-full"
                            />
                        </div>
                        {/* Boton para mostrar el menú de filtros */}
                        <button
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                            className="w-8 h-8 flex items-center gap-2 bg-white border border-gray-700 dark:bg-gray-900 dark:border-gray-800] rounded-md justify-center">
                            <Image width={4} height={4} src="/filter.svg" alt="Filtrar" className="w-4 h-4" />
                        </button>
                        {/* Menú de filtros */}
                        {showFilterMenu && (
                            <div ref={filterMenuRef} className="absolute text-center top-[48px] left-[320px] w-[200px] rounded-[8px] bg-white border border-gray-700 dark:bg-gray-900 dark:border-gray-800] shadow-lg p-4 z-50 flex flex-col gap-2">
                                <p className="font-semibold text-sm text-gray-400">Estado del proyecto</p>
                                <button
                                    onClick={() => handleFilterChange('status', 'En progreso')}
                                    className={`px-3 py-1 rounded-md text-sm text-gray-400 transition 
                                ${filters.status === 'En progreso' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                                >En progreso</button>
                                <button
                                    onClick={() => handleFilterChange('status', 'Completado')}
                                    className={`px-3 py-1 rounded-md text-sm text-gray-400 transition 
                                ${filters.status === 'Completado' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                                >Completado</button>
                                <button
                                    onClick={() => handleFilterChange('status', 'Pendiente')}
                                    className={`px-3 py-1 rounded-md text-sm text-gray-400 transition 
                                ${filters.status === 'Pendiente' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                                >Pendiente</button>
                                <button onClick={clearFilters} className="mt-2 px-3 py-1 rounded-md text-sm text-red-500 hover:bg-red-200 transition">
                                    Quitar filtros</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-4 relative">
                <p className="text-md text-end text-white hidden sm:hidden md:block">
                    Bienvenido, {capitalize(session?.user?.name) ?? "Invitado"}
                </p>
                <p className="text-sm text-end text-white sm:hidden">
                    {capitalize(session?.user?.name) ?? "Invitado"}
                </p>
                {/* Sección Derecha: Iconos de Notificación y Perfil */}
                {/* Botón de perfil */}
                <button
                    className="w-8 h-8 bg-white border border-gray-700 dark:bg-gray-900 dark:border-gray-800] rounded-full flex items-center justify-center"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                    <Image width={4} height={4} src="/user.svg" alt="Perfil" className="w-4 h-4" />
                </button>

                {/* Dropdown de perfil */}
                {showProfileMenu && (
                    <div
                        ref={menuRef}
                        className="absolute top-[48px] right-0 w-[266px] rounded-[16px] bg-white border border-gray-700 dark:bg-gray-900 dark:border-gray-800] shadow-lg p-4 z-50 flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-4 text-white font-medium text-[14px]">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition"
                            >
                                <Image width={4} height={4} src="/log-out.png" alt="Salir" className="w-5 h-5" />
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {/* Mobile search overlay */}
            {showMobileSearch && (
                <div className="absolute inset-x-0 top-[64px] z-50 p-4 bg-gray-900/95 backdrop-blur-sm sm:hidden">
                    <div className="flex items-center gap-2 bg-white border border-gray-700 dark:bg-gray-900 dark:border-gray-800] px-4 py-2 rounded-[8px]">
                        <Image width={16} height={16} src="/search.svg" alt="Buscar" className="w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar proyectos..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="bg-transparent outline-none text-white text-sm placeholder:text-[#999] w-full"
                        />
                        <button onClick={() => setShowMobileSearch(false)} className="ml-2 text-sm text-gray-300">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserNavbar;