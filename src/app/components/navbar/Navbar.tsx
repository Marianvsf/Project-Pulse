"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Detectar scroll para hacer el nav más compacto
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToRegistration = () => {
    setIsMenuOpen(false);
    router.push("/register");
  };

  const goToLogin = () => {
    setIsMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center p-4 pointer-events-none">

      {/* CONTENEDOR PRINCIPAL */}
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl transition-all duration-500 ease-out rounded-full border border-white/10 backdrop-blur-xl shadow-2xl
        ${scrolled
            ? "h-16 bg-[#0B1120]/80 px-4 sm:px-6 shadow-black/50"
            : "h-20 bg-[#0B1120]/40 px-6 sm:px-8"
          }`}
      >
        {/* LOGO Y TÍTULO */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3 group outline-none"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 transition-transform duration-300 group-hover:scale-105 group-hover:border-white/40">
            <Image
              width={24}
              height={24}
              src="/Logo.png"
              className="object-contain"
              alt="Project Pulse Logo"
            />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white">
            Project Pulse
          </span>
        </Link>

        {/* ENLACES DESKTOP */}
        <div className="hidden md:flex items-center gap-2">
          {pathname !== "/login" && (
            <button
              onClick={goToLogin}
              className="px-5 py-2.5 text-sm font-medium text-gray-300 transition-all duration-300 rounded-full hover:bg-white/10 hover:text-white active:scale-95"
            >
              Iniciar sesión
            </button>
          )}

          {pathname !== "/register" && (
            <button
              onClick={goToRegistration}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#FF8C33] to-[#FF7400] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,116,0,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,116,0,0.4)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
            >
              <span className="relative z-10">Registrarse</span>
              {/* Brillo sutil superior en el botón */}
              <div className="absolute inset-x-0 top-0 h-px w-full bg-white/40" />
            </button>
          )}
        </div>

        {/* BOTÓN HAMBURGUESA ANIMADO (Móvil) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative p-2 ml-4 text-gray-300 transition-colors rounded-full md:hidden hover:bg-white/10 hover:text-white focus:outline-none active:scale-95"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Menú principal</span>
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </nav>

      {/* MENÚ MÓVIL (Dropdown) */}
      <div
        className={`absolute top-full left-4 right-4 mt-2 max-w-5xl mx-auto pointer-events-auto transition-all duration-300 ease-out origin-top md:hidden
        ${isMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible"
          }`}
      >
        <div className="flex flex-col p-3 space-y-2 overflow-hidden border rounded-[24px] bg-[#0B1120]/95 backdrop-blur-2xl border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          {pathname !== "/login" && (
            <button
              onClick={goToLogin}
              className="w-full px-4 py-3.5 text-sm font-medium text-left text-gray-300 transition-colors rounded-[16px] hover:bg-white/10 hover:text-white active:bg-white/5"
            >
              Iniciar sesión
            </button>
          )}
          {pathname !== "/register" && (
            <button
              onClick={goToRegistration}
              className="w-full px-4 py-3.5 text-sm font-semibold text-center text-white transition-all bg-gradient-to-r from-[#FF8C33] to-[#FF7400] rounded-[16px] hover:shadow-[0_0_20px_rgba(255,116,0,0.3)] active:scale-[0.98]"
            >
              Registrarse
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;