"use client";


import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";


export default function HomePage() {
    const router = useRouter();
    const goToRegistration = () => {
        router.push("/register");
    }
    const goToLogin = () => {
        router.push("/login");
    }

    return (
        <>
            <Navbar />
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 sm:p-20">
                <main className="flex flex-col row-start-2 items-center sm:items-start">
                    <div className="flex items-center flex-col sm:flex-row">
                        <h1>¡Bienvenido a Project Pulse!</h1>
                        <p>Por favor, selecciona una de las siguientes opciones para continuar.</p>
                        <div className="button-container">
                            <button onClick={goToRegistration} className="button">Registrarse</button>
                            <button onClick={goToLogin} className="ms-3 button secondary">Iniciar Sesión</button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}