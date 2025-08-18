"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
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
                    <img src="/Logo.png" className="w-10 h-10 rounded-full bg-gray-500" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-800 dark:text-white">Project Pulse</span>
                </a>
                <button onClick={toggleMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isMenuOpen}>
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`${isMenuOpen ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-900">
                        <li>
                            <button onClick={goToHome} className="block py-2 px-3 text-orange-600 md:bg-transparent md:p-0" aria-current="page">Home</button>
                        </li>
                        <li>
                            <button onClick={goToLogin} className="block py-2 px-3 text-slate-800 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Iniciar sesión</button>
                        </li>
                        <li>
                            <button onClick={goToRegistration} className="block py-2 px-3 text-slate-800 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Registrarse</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;