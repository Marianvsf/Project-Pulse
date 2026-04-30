"use client"

import { useState, FormEvent } from "react";
import UserNavbar from "../components/navbar/UserNavbar";
import { Send, Loader2, User, Mail, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";

export default function SupportPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<null | "idle" | "sending" | "success" | "error">(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        try {
            // Placeholder: simula envío. Reemplazar por API real.
            await new Promise((r) => setTimeout(r, 1200));
            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");

            // Opcional: regresar el estado a idle después de unos segundos
            setTimeout(() => setStatus("idle"), 5000);
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative selection:bg-blue-100 selection:text-blue-900">
            {/* Fondo decorativo (Efecto de luz sutil en la parte superior) */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none" />

            <UserNavbar onSearch={() => { }} />

            {/* Contenedor centralizado para el contenido */}
            <div className="relative pt-32 pb-16 px-4 sm:px-6 max-w-3xl mx-auto z-10">

                {/* Cabecera de la página */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        ¿Cómo podemos <span className="text-blue-600">ayudarte?</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-xl mx-auto">
                        Cuéntanos qué necesitas y nuestro equipo de soporte se pondrá en contacto contigo lo más rápido posible.
                    </p>
                </div>

                {/* Tarjeta del Formulario */}
                <main className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Fila para Nombre y Email en desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Input: Nombre */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Nombre completo</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white"
                                        placeholder="Ej. Juan Pérez"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Input: Email */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Correo electrónico</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white"
                                        placeholder="tucorreo@ejemplo.com"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Input: Mensaje */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700">Mensaje</label>
                            <div className="relative">
                                <div className="absolute top-3 left-4 pointer-events-none">
                                    <MessageSquare className="h-5 w-5 text-slate-400" />
                                </div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 min-h-[140px] text-slate-800 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white resize-y"
                                    placeholder="Describe detalladamente tu problema o consulta..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Alertas de Feedback */}
                        {status === "error" && (
                            <div className="flex items-center gap-2 text-red-700 bg-red-50 p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-bottom-2">
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                <p className="text-sm font-medium">Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.</p>
                            </div>
                        )}

                        {status === "success" && (
                            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-4 rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-2">
                                <CheckCircle2 className="h-5 w-5 shrink-0" />
                                <p className="text-sm font-medium">¡Mensaje enviado con éxito! Te contactaremos pronto.</p>
                            </div>
                        )}

                        {/* Botón de Enviar */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 font-medium transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none shadow-md shadow-blue-500/20"
                            >
                                {status === "sending" ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Enviar mensaje
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </main>
            </div>
        </div>
    );
}