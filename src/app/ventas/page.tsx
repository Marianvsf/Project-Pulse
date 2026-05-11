import Link from "next/link";
import { ArrowRight, BarChart3, CalendarDays, CheckCircle2, Sparkles, ShieldCheck, Target, Users, Zap } from "lucide-react";
import Navbar from "../components/navbar/Navbar";

export const metadata = {
    title: "Ventas | Project Pulse",
    description: "Página de ventas de Project Pulse con propuesta de valor, beneficios, planes y llamada a la acción.",
};

const proofPoints = [
    { value: "+42%", label: "más velocidad de ejecución" },
    { value: "24/7", label: "seguimiento de oportunidades" },
    { value: "3 min", label: "para agendar una demo" },
    { value: "99.9%", label: "de disponibilidad de plataforma" },
];

const features = [
    {
        icon: Sparkles,
        title: "Mensajes que convierten",
        description: "Unifica tareas, equipos y prioridades en una narrativa clara que acelera la decisión de compra.",
    },
    {
        icon: BarChart3,
        title: "Métricas que venden solas",
        description: "Muestra impacto, ahorro de tiempo y progreso real con datos fáciles de entender para dirección y ventas.",
    },
    {
        icon: ShieldCheck,
        title: "Confianza desde el primer clic",
        description: "Seguridad, continuidad y control de acceso para que el equipo comercial comparta la propuesta sin fricción.",
    },
];

const steps = [
    {
        title: "1. Descubre",
        description: "Entendemos tu proceso, tamaño de equipo y objetivo comercial.",
    },
    {
        title: "2. Diseña",
        description: "Preparamos una demo enfocada en el valor más relevante para tu caso.",
    },
    {
        title: "3. Cierra",
        description: "Acompañamos la decisión con un plan claro, simple y sin sorpresas.",
    },
];

export default function SalesPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] text-slate-900">
            <div className="relative z-50">
                <Navbar />
            </div>

            <section className="relative overflow-hidden border-b border-slate-200/70 bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.08),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)]" />
                <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 backdrop-blur-md shadow-sm">
                        <Sparkles className="h-4 w-4 text-indigo-500" />
                        Página de ventas de Project Pulse
                    </div>

                    <div className="mt-8 grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
                        <div>
                            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                                Convierte interés en demos y demos en ingresos.
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                                Project Pulse ayuda a tu equipo a presentar valor con claridad, acelerar la decisión y cerrar con una propuesta que se entiende en minutos, no en horas.
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-8 py-4 font-bold text-white transition-transform hover:scale-[1.02] shadow-lg shadow-slate-900/10">
                                    Agendar demo
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link href="/" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 backdrop-blur-md transition-colors hover:bg-slate-50 shadow-sm">
                                    Volver al home
                                </Link>
                            </div>

                            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {proofPoints.map((item) => (
                                    <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-4 backdrop-blur-md shadow-sm">
                                        <p className="text-2xl font-black text-slate-950">{item.value}</p>
                                        <p className="mt-1 text-sm leading-snug text-slate-500">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-transparent blur-2xl" />
                            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/60 backdrop-blur-xl">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">Pipeline comercial</p>
                                        <p className="text-2xl font-bold text-slate-950">Revenue Snapshot</p>
                                    </div>
                                    <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                                        En crecimiento
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="flex items-center gap-3 text-slate-900">
                                            <Target className="h-5 w-5 text-indigo-500" />
                                            <span className="font-semibold">Lead calificado</span>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-500">Interés alto, caso de uso claro y siguiente paso definido.</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="flex items-center gap-3 text-slate-900">
                                            <Users className="h-5 w-5 text-cyan-500" />
                                            <span className="font-semibold">Equipo alineado</span>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-500">Ventas, producto y éxito del cliente comparten la misma narrativa.</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="flex items-center gap-3 text-slate-900">
                                            <CalendarDays className="h-5 w-5 text-emerald-500" />
                                            <span className="font-semibold">Demo reservada</span>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-500">La experiencia guía al usuario hasta la acción final sin distracciones.</p>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
                                        <Zap className="h-4 w-4 text-indigo-500" />
                                        Mensaje clave
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                        Menos fricción comercial. Más claridad. Más cierres con una sola plataforma.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-slate-200/70 bg-[#fafafa] px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600/80">Por qué compra la gente</p>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            Una propuesta de valor que se entiende, se recuerda y se comparte.
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <article key={feature.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm backdrop-blur-md">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mt-5 text-xl font-bold text-slate-950">{feature.title}</h3>
                                    <p className="mt-3 leading-relaxed text-slate-500">{feature.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600/80">Proceso comercial</p>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            Una ruta corta para pasar de curiosidad a compromiso.
                        </h2>
                        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                            Diseñamos la experiencia para que cada interacción reduzca dudas y acelere la decisión.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {steps.map((step) => (
                            <div key={step.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 backdrop-blur-md shadow-sm">
                                <div className="text-lg font-bold text-slate-950">{step.title}</div>
                                <p className="mt-2 text-slate-500">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#fafafa] px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-slate-200 bg-[linear-gradient(135deg,_rgba(99,102,241,0.10),_rgba(14,165,233,0.06),_rgba(255,255,255,1))] p-8 shadow-2xl shadow-slate-200/60 sm:p-12">
                    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600/80">Siguiente paso</p>
                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                                Lanza la conversación comercial correcta desde el primer contacto.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                                Si quieres una versión más orientada a enterprise, también la puedo adaptar con secciones de casos de éxito, seguridad y formulario de contacto.
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="space-y-4 text-sm text-slate-600">
                                {[
                                    "Propuesta clara para dirección y operaciones",
                                    "Demo enfocada en valor y no en funciones sueltas",
                                    "CTA visible para convertir desde el home",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-bold text-white transition-transform hover:scale-[1.02] shadow-lg shadow-slate-900/10">
                                    Empezar gratis
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 backdrop-blur-md transition-colors hover:bg-slate-50 shadow-sm">
                                    Ver demo
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}