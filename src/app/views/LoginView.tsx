"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Swal from "sweetalert2";
import Navbar from "../components/navbar/Navbar"; // Asegúrate de importar el Navbar

export default function LoginView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const goToRegistration = () => {
        router.push("/register");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (response?.ok) {
                console.log("Login successful");
                router.push("/dashboard");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Acceso denegado",
                    text: "El correo o la contraseña son incorrectos.",
                    confirmButtonColor: "#FF7400", // Personalizado con tu color de marca
                    confirmButtonText: "Intentar de nuevo"
                });
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            {/* FONDO: bg-gray-100 */}
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 pt-24">

                {/* TARJETA PRINCIPAL: Diseño Split (Imagen Izq / Form Der) */}
                <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[550px]">

                    {/* LADO IZQUIERDO: Branding (Azul Project Pulse) */}
                    <div className="w-full md:w-5/12 bg-blue-950 flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
                        {/* Decoración de fondo */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900 to-transparent opacity-40" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="relative w-40 h-40 mb-6 drop-shadow-2xl">
                                <Image
                                    className="object-contain"
                                    src="/IconLogo.png"
                                    alt="Logo Project Pulse"
                                    fill
                                    priority
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">¡Hola de nuevo!</h2>
                            <p className="text-blue-200 text-sm">
                                Ingresa a tu panel para continuar gestionando tus proyectos.
                            </p>
                        </div>
                    </div>

                    {/* LADO DERECHO: Formulario (Blanco) */}
                    <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white">
                        <div className="max-w-sm mx-auto w-full">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión</h1>
                            <p className="text-gray-500 mb-8 text-sm">Introduce tus credenciales para acceder.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-[50px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7400] focus:ring-1 focus:ring-[#FF7400] transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1.5 ml-1">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Contraseña
                                        </label>
                                        {/* Opcional: Link de recuperar contraseña */}
                                        <a href="#" className="text-xs text-[#FF7400] hover:underline font-medium">
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-[50px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7400] focus:ring-1 focus:ring-[#FF7400] transition-all"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-[50px] bg-[#FF7400] hover:bg-[#e06500] text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Entrando...</span>
                                        </>
                                    ) : (
                                        "Entrar"
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-600 mt-6">
                                    ¿No tienes cuenta?{" "}
                                    <button
                                        type="button"
                                        onClick={goToRegistration}
                                        className="text-[#FF7400] font-semibold hover:underline"
                                    >
                                        Regístrate
                                    </button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}