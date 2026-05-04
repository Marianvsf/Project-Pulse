"use client";

import { FormEvent, useState } from "react";
import UserNavbar from "../components/navbar/UserNavbar";
import {
    AlertCircle,
    BadgeHelp,
    CheckCircle2,
    Clock3,
    ExternalLink,
    Headphones,
    LifeBuoy,
    Mail,
    MessageSquare,
    Phone,
    Send,
    Sparkles,
    User,
    Zap,
} from "lucide-react";

const supportEmail = "soporte@projectpulse.app";

const quickFixes = [
    "Revisa que tu correo coincida con el de la cuenta registrada.",
    "Incluye el nombre del proyecto y una captura si el error se repite.",
    "Indica el navegador, dispositivo y hora aproximada del incidente.",
];

const supportChannels = [
    {
        title: "Correo prioritario",
        value: supportEmail,
        description: "Para incidencias, solicitudes y seguimiento detallado.",
        icon: Mail,
    },
    {
        title: "Respuesta media",
        value: "Menos de 24 horas",
        description: "Atención de lunes a viernes con prioridad en bloqueos de acceso.",
        icon: Clock3,
    },
    {
        title: "Cobertura",
        value: "8:00 - 18:00",
        description: "Horario de soporte operativo para cuentas activas.",
        icon: Headphones,
    },
];

type SupportStatus = "idle" | "sending" | "success" | "error";

export default function SupportPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
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

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f4f7fb] text-slate-900 selection:bg-orange-200 selection:text-orange-950">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,116,0,0.18),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.14),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(244,247,251,1))]" />
            <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-orange-300/25 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-44 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />

            <UserNavbar onSearch={() => { }} showSearchAndFilter={false} />

            <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
                <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm backdrop-blur">
                            <Sparkles className="h-4 w-4" />
                            Soporte humano para bloqueos reales
                        </div>

                        <div className="space-y-5">
                            <h1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Contacta soporte sin perder tiempo.
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                                Cuéntanos qué ocurrió y te ayudamos con un seguimiento claro. Este canal está pensado para incidencias de acceso, errores en proyectos, cobros y dudas operativas.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {supportChannels.map((channel) => (
                                <article key={channel.title} className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
                                        <channel.icon className="h-5 w-5" />
                                    </div>
                                    <p className="text-sm font-semibold text-slate-500">{channel.title}</p>
                                    <p className="mt-1 text-lg font-bold text-slate-950">{channel.value}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">{channel.description}</p>
                                </article>
                            ))}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <article className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20">
                                <div className="flex items-center gap-3 text-orange-300">
                                    <LifeBuoy className="h-5 w-5" />
                                    <span className="text-sm font-semibold uppercase tracking-[0.25em]">Prioridad 1</span>
                                </div>
                                <h2 className="mt-4 text-2xl font-bold tracking-tight">Si no puedes entrar, nos encargamos primero.</h2>
                                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                                    Los bloqueos de acceso y errores que impiden trabajar tienen prioridad sobre consultas generales.
                                </p>
                            </article>

                            <article className="rounded-[2rem] border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-[0_20px_60px_rgba(249,115,22,0.12)]">
                                <div className="flex items-center gap-3 text-orange-600">
                                    <BadgeHelp className="h-5 w-5" />
                                    <span className="text-sm font-semibold uppercase tracking-[0.25em]">Guia rapida</span>
                                </div>
                                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                                    {quickFixes.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </div>
                    </div>

                    <div className="rounded-[2.25rem] border border-white/70 bg-white/85 p-5 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-7">
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">Enviar solicitud</p>
                                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Escribe tu caso y abre el correo listo para enviar.</h2>
                            </div>
                            <div className="hidden rounded-2xl bg-slate-950 p-3 text-white shadow-lg sm:block">
                                <Phone className="h-5 w-5" />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
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

                            <div className="grid gap-5 sm:grid-cols-2">
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
                    </div>
                </section>
            </main>
        </div>
    );
}