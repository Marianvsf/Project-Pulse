"use client";

import { FormEvent, useState } from "react";
import {
    AlertCircle,
    CheckCircle2,
    ExternalLink,
    Mail,
    MessageSquare,
    Send,
    User,
    Zap,
} from "lucide-react";

export const supportEmail = "soporte@projectpulse.app";

type SupportStatus = "idle" | "sending" | "success" | "error";

type SupportFormProps = {
    /** Apila los campos en una sola columna (útil en espacios estrechos como el sidebar). */
    compact?: boolean;
    /** Valores iniciales opcionales para prellenar el formulario. */
    defaultName?: string;
    defaultEmail?: string;
};

export default function SupportForm({
    compact = false,
    defaultName = "",
    defaultEmail = "",
}: SupportFormProps) {
    const [name, setName] = useState(defaultName);
    const [email, setEmail] = useState(defaultEmail);
    const [subject, setSubject] = useState("Problema con mi cuenta");
    const [priority, setPriority] = useState("Alta");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<SupportStatus>("idle");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const subjectText = `Project Pulse | ${subject}`;
        const body = [
            `Nombre: ${name}`,
            `Correo: ${email}`,
            `Prioridad: ${priority}`,
            "",
            message,
        ]
            .filter(Boolean)
            .join("\n");

        const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(body)}`;

        setStatus("sending");
        window.setTimeout(() => {
            window.location.href = mailtoUrl;
            setStatus("success");
        }, 150);
    };

    const twoColGrid = compact ? "grid gap-5" : "grid gap-5 sm:grid-cols-2";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className={twoColGrid}>
                <label className="space-y-2">
                    <span className="ml-1 text-sm font-semibold text-slate-700">Nombre completo</span>
                    <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Ej. Juan Perez"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            required
                        />
                    </div>
                </label>

                <label className="space-y-2">
                    <span className="ml-1 text-sm font-semibold text-slate-700">Correo electronico</span>
                    <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="tu@correo.com"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            required
                        />
                    </div>
                </label>
            </div>

            <label className="space-y-2">
                <span className="ml-1 text-sm font-semibold text-slate-700">Tema</span>
                <input
                    type="text"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Ej. No puedo editar un proyecto"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    required
                />
            </label>

            <div className={twoColGrid}>
                <label className="space-y-2">
                    <span className="ml-1 text-sm font-semibold text-slate-700">Prioridad</span>
                    <div className="relative">
                        <Zap className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <select
                            value={priority}
                            onChange={(event) => setPriority(event.target.value)}
                            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-10 text-slate-900 outline-none transition-all focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        >
                            <option>Alta</option>
                            <option>Media</option>
                            <option>Baja</option>
                        </select>
                    </div>
                </label>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Correo directo</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{supportEmail}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">Se abrirá en tu cliente de correo con el asunto y el detalle listos.</p>
                </div>
            </div>

            <label className="space-y-2">
                <span className="ml-1 text-sm font-semibold text-slate-700">Mensaje</span>
                <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />
                    <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Describe lo que pasa, en que proyecto ocurre y si aparece algun error en pantalla."
                        className="min-h-[180px] w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        required
                    />
                </div>
            </label>

            {status === "error" && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-700">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                    <p className="text-sm leading-6">No se pudo preparar el contacto. Intenta de nuevo o copia el correo manualmente.</p>
                </div>
            )}

            {status === "success" && (
                <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-emerald-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <p className="text-sm leading-6">Tu cliente de correo se abrirá con el mensaje listo para enviar.</p>
                </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.24)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {status === "sending" ? "Abriendo correo..." : "Enviar solicitud"}
                    <Send className="h-4 w-4" />
                </button>

                <a
                    href={`mailto:${supportEmail}`}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-orange-200 hover:text-orange-700"
                >
                    <ExternalLink className="h-4 w-4" />
                    Abrir correo directo
                </a>
            </div>
        </form>
    );
}
