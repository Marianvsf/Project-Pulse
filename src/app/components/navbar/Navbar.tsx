"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const goToRegistration = () => {
        setIsMenuOpen(false); // Cerramos menú al navegar
        router.push("/register");
    }
    const goToLogin = () => {
        setIsMenuOpen(false);
        router.push("/login");
    }
    const goToHome = () => {
        setIsMenuOpen(false);
        router.push("/");
    }
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* CONTENEDOR PRINCIPAL 
              - fixed top-4: Lo fija arriba con margen.
              - mx-auto max-w-5xl: Centrado y ancho máximo para que parezca una "isla".
              - backdrop-blur-md + bg-black/40: El efecto cristal.
            */}
            <nav className="fixed top-4 inset-x-0 z-50 mx-4 lg:mx-auto max-w-6xl h-[72px] rounded-[16px] border border-white/10 bg-black/60 backdrop-blur-md shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between h-full px-4 lg:px-6">

                    {/* LOGO */}
                    <button onClick={goToHome} className="flex items-center gap-3 group">
                        <div className="relative overflow-hidden rounded-full border border-white/10">
                            <Image
                                width={36}
                                height={36}
                                src="/Logo.png"
                                className="object-cover"
                                alt="Project Pulse Logo"
                            />
                        </div>
                        <span className="text-lg font-medium tracking-tight text-white group-hover:text-gray-300 transition-colors">
                            Project Pulse
                        </span>
                    </button>

                    {/* MENU DESKTOP (Botones de acción) */}
                    <div className="hidden md:flex items-center gap-6">
                        {pathname !== '/login' && (
                            <button
                                onClick={goToLogin}
                                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                            >
                                Iniciar sesión
                            </button>
                        )}

                        {pathname !== '/register' && (
                            <button
                                onClick={goToRegistration}
                                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#FF7400] px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-orange-500/25 hover:scale-105"
                            >
                                <span className="relative z-10">Registrarse</span>
                                {/* Efecto de brillo sutil en hover */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500 ease-out" />
                            </button>
                        )}
                    </div>

                    {/* BOTÓN HAMBURGUESA (Móvil) */}
                    <button
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center p-2 text-white/80 rounded-lg md:hidden hover:bg-white/10 focus:outline-none"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* MENÚ MÓVIL (Dropdown flotante) 
                Se renderiza fuera del nav para no romper el layout flexible del nav
            */}
            {isMenuOpen && (
                <div className="fixed top-24 inset-x-4 z-40 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
                    <div className="flex flex-col p-4 rounded-2xl bg-[#1f2023] border border-white/10 shadow-2xl space-y-3">
                        {pathname !== '/login' && (
                            <button
                                onClick={goToLogin}
                                className="w-full text-left px-4 py-3 text-white rounded-xl hover:bg-white/5 transition-colors"
                            >
                                Iniciar sesión
                            </button>
                        )}
                        {pathname !== '/register' && (
                            <button
                                onClick={goToRegistration}
                                className="w-full text-center px-4 py-3 text-white font-medium bg-[#FF7400] rounded-xl hover:bg-[#e06500] transition-colors shadow-lg"
                            >
                                Registrarse
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;