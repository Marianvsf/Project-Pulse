"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Detectar scroll para hacer el nav más compacto y cerrar el menú móvil si se desplaza
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY > 50) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al hacer click fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Cerrar menú si cambia la ruta de navegación
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const goToRegistration = () => {
    router.push("/register");
  };

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center p-0 sm:p-4 pointer-events-none" ref={menuRef}>


      <nav
        className={`pointer-events-auto flex items-center justify-between w-full sm:max-w-5xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-none sm:rounded-full border-x-0 sm:border border-y border-white/10 backdrop-blur-md
        ${scrolled
            ? "h-14 bg-[#0B1120]/75 px-5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
            : "h-16 sm:h-20 bg-[#0B1120]/40 px-5 sm:px-7 shadow-none"
          }`}
      >

        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3 group outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120] rounded-full"
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-105 group-hover:border-white/20">
            <Image
              width={22}
              height={22}
              src="/Logo.png"
              className="object-contain"
              alt="Project Pulse Logo"
              priority
            />
          </div>
          <span className="text-sm font-semibold tracking-wide text-white/90 transition-colors duration-300 group-hover:text-white uppercase">
            Project Pulse
          </span>
        </Link>

        
        <div className="hidden md:flex items-center gap-3">
          {pathname !== "/login" && (
            <button
              onClick={goToLogin}
              className="px-5 py-2 text-sm font-medium text-gray-300 transition-all duration-300 rounded-full hover:bg-white/5 hover:text-white active:scale-95 outline-none focus-visible:ring-1 focus-visible:ring-white/30"
            >
              Iniciar sesión
            </button>
          )}

          {pathname !== "/register" && (
            <button
              onClick={goToRegistration}
              className="group relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#FF8C33] to-[#FF7400] px-5 py-2 text-sm font-medium text-white shadow-[0_4px_20px_rgba(255,116,0,0.15)] transition-all duration-300 hover:shadow-[0_4px_25px_rgba(255,116,0,0.35)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0 outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <span className="relative z-10">Registrarse</span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          )}
        </div>

        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative flex items-center justify-center h-9 w-9 text-gray-300 transition-colors rounded-full md:hidden hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 active:scale-95"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Menú principal</span>
          <div className="relative w-4 h-4 flex flex-col justify-between items-center">
            <span className={`absolute h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45 top-1.5" : "top-0"}`} />
            <span className={`absolute h-0.5 w-full bg-current rounded-full transition-all duration-200 top-1.5 ${isMenuOpen ? "opacity-0 scale-0" : "opacity-100"}`} />
            <span className={`absolute h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45 top-1.5" : "top-3"}`} />
          </div>
        </button>
      </nav>

      
      <div
        className={`absolute top-full left-4 right-4 mt-2 max-w-5xl mx-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top md:hidden
        ${isMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-2 pointer-events-none invisible"
          }`}
      >
        <div className="flex flex-col p-2 space-y-1 overflow-hidden border rounded-[24px] bg-[#0B1120]/90 backdrop-blur-xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {pathname !== "/login" && (
            <button
              onClick={goToLogin}
              className="w-full px-4 py-3 text-sm font-medium text-left text-gray-300 transition-colors rounded-[16px] hover:bg-white/5 hover:text-white active:bg-white/10"
            >
              Iniciar sesión
            </button>
          )}
          {pathname !== "/register" && (
            <button
              onClick={goToRegistration}
              className="w-full px-4 py-3 text-sm font-medium text-center text-white transition-all bg-gradient-to-r from-[#FF8C33] to-[#FF7400] rounded-[16px] shadow-lg shadow-orange-500/10 active:scale-[0.99]"
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