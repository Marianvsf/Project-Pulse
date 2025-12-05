"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const goToRegistration = () => {
        router.push("/register");
    }
    const goToLogin = () => {
        router.push("/login");
    }
    const goToHome = () => {
        router.push("/");
    }
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <nav className="bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
            <div className="max-w-[1536px] flex flex-wrap items-center justify-between mx-auto p-2 px-5">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image width={40} height={40} src="/Logo.png" className="rounded-full bg-gray-500" alt="Logo" />
                    <span className="self-center text-xl whitespace-nowrap text-slate-800 dark:text-white">Project Pulse</span>
                </a>
                <button onClick={toggleMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isMenuOpen}>
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                {pathname !== '/login' && (
                    <li>
                        <button onClick={goToLogin} className="block py-2 px-3 text-slate-800 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Iniciar sesión</button>
                    </li>
                )}

                {pathname !== '/register' && (
                    <li>
                        <button onClick={goToRegistration} className="block py-2 px-3 text-slate-800 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Registrarse</button>
                    </li>
                )}
            </div>
        </nav>
    );
};

export default Navbar;