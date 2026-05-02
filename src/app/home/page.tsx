"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import FaqBot from "../components/FaqBot";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LayoutDashboard,
  Zap,
  Users,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronDown,
  Bot
} from "lucide-react";

type FAQEntry = {
  id: number;
  question: string;
  answer: string;
  keywords: string[];
};

const faqEntries: FAQEntry[] = [
  { id: 1, question: "¿Cómo funciona la seguridad y privacidad?", answer: "Usamos cifrado AES-256, backups automáticos diarios y controles de acceso por rol.", keywords: ["seguridad", "privacidad", "cifrado"] },
  { id: 2, question: "¿Puedo cancelar mi plan en cualquier momento?", answer: "Sí. Puedes cancelar en cualquier momento desde tu cuenta, sin penalizaciones.", keywords: ["cancelar", "plan"] },
  { id: 3, question: "¿Se integra con otras herramientas?", answer: "Sí. Tenemos integración nativa con Slack, Google Workspace, GitHub y más herramientas mediante API.", keywords: ["integracion", "slack", "github"] },
  { id: 4, question: "¿Qué incluye el plan Starter?", answer: "El plan Starter incluye hasta 3 proyectos activos, tareas ilimitadas, colaboradores básicos y app móvil.", keywords: ["starter", "gratis"] },
  { id: 5, question: "¿Qué incluye el plan Pro Team?", answer: "Pro Team incluye todo lo de Starter, más proyectos ilimitados, asistente IA, permisos avanzados y soporte prioritario.", keywords: ["pro", "team", "ia"] },
  { id: 6, question: "¿Cómo empiezo a usar Project Pulse?", answer: "Crea una cuenta gratis, configura tu primer proyecto e invita a tu equipo en pocos minutos.", keywords: ["empezar", "registro"] },
];

export default function HomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const images = ["/assets/fot1.jpg", "/assets/fot2.jpg", "/assets/fot3.jpg"];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative bg-[#fafafa] font-sans antialiased text-slate-900 selection:bg-indigo-200 selection:text-indigo-900">

      {/* INYECCIÓN DE CSS PARA ANIMACIONES AVANZADAS */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .glass-panel { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.5); }
      `}} />

      <div className="relative z-50">
        <Navbar />
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden group">
        <div className="absolute inset-0 z-0 bg-slate-950">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <Image
                src={image}
                alt="Hero Background"
                fill
                className={`object-cover transition-transform duration-[10000ms] ease-linear ${index === currentSlide ? "scale-110" : "scale-100"}`}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-[#fafafa] mix-blend-multiply" />
            </div>
          ))}
        </div>

        {/* Controles del Carrusel */}
        <div className="absolute bottom-32 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
            />
          ))}
        </div>

        <button onClick={prevSlide} className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full text-white/50 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md border border-transparent hover:border-white/10">
          <ChevronLeft size={28} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full text-white/50 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md border border-transparent hover:border-white/10">
          <ChevronRight size={28} />
        </button>

        {/* Contenido Hero */}
        <div className="relative z-20 w-full max-w-5xl px-4 sm:px-6 text-center text-white mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 shadow-[0_0_30px_rgba(99,102,241,0.15)] cursor-default">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-sm font-semibold text-indigo-200 tracking-wide">Gestión potenciada por Inteligencia Artificial</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-[1.1]">
            Tus proyectos,
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
              en un solo latido.
            </span>
          </h1>

          {/* NUEVO: Reemplazamos las comillas "sobrevivir" por &quot;sobrevivir&quot; */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Project-Pulse unifica tareas, equipos y cronogramas. La herramienta definitiva para dejar de &quot;sobrevivir&quot; al trabajo y empezar a liderarlo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => router.push("/register")} className="group h-14 w-full sm:w-auto px-8 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2">
              Empezar Gratis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => router.push("/login")} className="h-14 w-full sm:w-auto px-8 bg-white/5 border border-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/10 transition-all flex items-center justify-center">
              Ver Demo Interactiva
            </button>
          </div>
        </div>
      </header>

      {/* --- STATS OVERLAP --- */}
      <section className="relative z-30 px-4 sm:px-6 max-w-5xl mx-auto -mt-16 sm:-mt-20">
        <div className="glass-panel rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-wrap justify-around gap-8 text-center divide-x divide-slate-200/50">
          {[
            { value: "+30%", label: "Eficiencia" },
            { value: "10k+", label: "Proyectos activos" },
            { value: "24/7", label: "Soporte experto" },
            { value: "4.9/5", label: "Satisfacción" },
          ].map((stat, i) => (
            <div key={i} className="flex-1 min-w-[120px] px-4">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{stat.value}</p>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- BENTO GRID --- */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">Potencia tu flujo de trabajo</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Diseñado para la velocidad, construido para la colaboración. Todo lo que necesitas en una interfaz limpia y sin distracciones.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Panel de Control */}
            <div className="md:col-span-2 bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-transform duration-500 flex flex-col justify-between overflow-hidden relative group">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 border border-blue-100">
                  <LayoutDashboard size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 tracking-tight">Panel de Control Intuitivo</h3>
                <p className="text-slate-500 max-w-md leading-relaxed text-lg">Visualiza el progreso con métricas en tiempo real que se adaptan a tu forma de trabajar.</p>
              </div>
              <div className="mt-12 bg-slate-50 rounded-2xl border border-slate-200 h-48 w-full group-hover:scale-[1.03] transition-transform duration-700 shadow-inner relative overflow-hidden p-4 flex flex-col gap-3">
                <div className="h-6 w-1/3 bg-slate-200 rounded-md animate-pulse" />
                <div className="flex-1 flex gap-3">
                  <div className="w-1/4 h-full bg-blue-100/50 rounded-xl border border-blue-200/50" />
                  <div className="w-3/4 h-full bg-white rounded-xl border border-slate-200 shadow-sm" />
                </div>
              </div>
            </div>

            {/* AI Speed Card */}
            <div className="bg-[#09090b] p-8 sm:p-10 rounded-[2.5rem] text-white shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 group-hover:opacity-60 transition-opacity" />

              <div className="relative w-20 h-20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse" />
                <div className="relative bg-slate-900 w-16 h-16 rounded-full border border-indigo-500/50 flex items-center justify-center shadow-inner">
                  <Zap className="text-indigo-400 w-8 h-8" />
                </div>
              </div>
              <span className="relative z-10 text-7xl font-black mb-2 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">10x</span>
              <h3 className="relative z-10 text-xl font-bold text-indigo-200 mb-2 tracking-tight">Velocidad IA</h3>
              <p className="relative z-10 text-slate-400 text-sm leading-relaxed">Aceleración en la entrega de tareas mediante nuestra inteligencia artificial.</p>
            </div>

            {/* Piloto Automático */}
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-transform duration-500">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-500 border border-orange-100">
                <Bot size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 tracking-tight">Piloto Automático</h3>
              <p className="text-slate-500 leading-relaxed">Configura flujos de trabajo que se ejecutan solos. Asigna tareas basadas en estados sin mover un dedo.</p>
            </div>

            {/* Colaboración */}
            <div className="md:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl overflow-hidden relative">
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
              <div className="flex-1 relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-blue-400 backdrop-blur-md">
                  <Users size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Colaboración en tiempo real</h3>
                <p className="text-slate-400 leading-relaxed text-lg">Menciones, hilos de comentarios y edición en vivo. Resuelve dudas sin salir de la plataforma.</p>
              </div>
              <div className="relative z-10 w-full md:w-auto bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                <div className="flex -space-x-4 mb-6">
                  {['JM', 'AR', 'LC'].map((init, i) => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-slate-900 flex items-center justify-center text-sm font-bold shadow-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                      {init}
                    </div>
                  ))}
                  <div className="w-14 h-14 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-300 shadow-lg">
                    +3
                  </div>
                </div>
                <div className="h-3 w-40 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-blue-500 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPARATIVA --- */}
      <section className="py-24 bg-white relative border-y border-slate-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">La diferencia es evidente</h2>
            <p className="text-slate-500 text-lg">Deja atrás las herramientas que te frenan.</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch">
            {/* VS Badge */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full items-center justify-center shadow-xl border border-slate-200 z-20 font-black text-slate-300 text-xl">
              VS
            </div>

            {/* Caos */}
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <XCircle className="text-red-400" size={28} />
                El caos habitual
              </h3>
              <ul className="space-y-6">
                {["Buscando en hilos de Slack interminables de hace 3 días.", "Hojas de Excel llamadas 'Presupuesto_V3_FINAL.xlsx'.", "Reuniones de sincronización de 1 hora que podrían ser un mail."].map((text, i) => (
                  <li key={i} className="flex gap-4 text-slate-600 text-lg leading-relaxed">
                    <span className="text-red-400 mt-1 flex-shrink-0">✗</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pulse */}
            <div className="bg-[#09090b] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
              <h3 className="relative z-10 text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <CheckCircle2 className="text-indigo-400" size={28} />
                Con Project Pulse
              </h3>
              <ul className="relative z-10 space-y-6">
                {["Una única fuente de verdad. Si está en Pulse, es la actual.", "Notificaciones inteligentes que solo avisan cuando es necesario.", "Claridad absoluta sobre quién hace qué y para cuándo."].map((text, i) => (
                  <li key={i} className="flex gap-4 text-slate-300 text-lg leading-relaxed">
                    <CheckCircle2 className="text-indigo-400 mt-1 flex-shrink-0" size={20} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRECIOS --- */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Planes simples y transparentes</h2>
          <p className="text-slate-500 text-lg mb-16">Empieza gratis, mejora cuando tu equipo lo necesite.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
            {/* Starter */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/20 text-left">
              <h3 className="text-2xl font-bold text-slate-900">Starter</h3>
              <p className="text-slate-500 mt-2 mb-8">Perfecto para individuos y pequeños proyectos.</p>
              <div className="text-6xl font-black text-slate-900 mb-2">$0</div>
              <p className="text-sm font-semibold text-slate-400 mb-10 uppercase tracking-wider">Gratis para siempre</p>

              <ul className="space-y-5 mb-10">
                {["Hasta 3 proyectos activos", "Tareas ilimitadas", "Colaboradores básicos", "App móvil"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <CheckCircle2 className="text-slate-300" size={20} /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full border-2 border-slate-200 text-slate-700 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all">Empezar con Starter</button>
            </div>

            {/* Pro */}
            <div className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-500">
              <div className="absolute -top-4 right-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg z-20">Más Popular</div>

              <div className="bg-slate-950 p-10 rounded-[calc(2.5rem-2px)] text-left h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">Pro Team <Sparkles className="text-indigo-400 w-5 h-5" /></h3>
                  <p className="text-slate-400 mt-2 mb-8">Para equipos que necesitan escalar su productividad.</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl font-black text-white">$15</span>
                    <span className="text-slate-500">/mes</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-500 mb-10 uppercase tracking-wider">Facturado anualmente</p>

                  <ul className="space-y-5 mb-10">
                    <li className="flex items-center gap-3 text-slate-300 font-medium"><CheckCircle2 className="text-indigo-500" size={20} /> Todo lo de Starter</li>
                    <li className="flex items-center gap-3 text-slate-300 font-medium"><CheckCircle2 className="text-indigo-500" size={20} /> Proyectos ilimitados</li>
                    <li className="flex items-center gap-3 text-indigo-300 font-medium bg-indigo-500/10 p-2.5 -ml-2.5 rounded-xl border border-indigo-500/20">
                      <Zap className="text-indigo-400" size={20} /> Asistente de IA (100 prompts)
                    </li>
                    <li className="flex items-center gap-3 text-slate-300 font-medium"><CheckCircle2 className="text-indigo-500" size={20} /> Soporte prioritario 24/7</li>
                  </ul>
                  <button className="w-full py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-100 transition-transform hover:scale-[1.02] active:scale-95">Prueba gratuita de 14 días</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white border-t border-slate-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Preguntas Frecuentes</h2>
          </div>

          <div className="space-y-4">
            {faqEntries.slice(0, 4).map((faq) => (
              <details key={faq.id} className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors [&_summary::-webkit-details-marker]:hidden shadow-sm">
                <summary className="flex justify-between items-center gap-4 font-bold cursor-pointer p-6 text-slate-900 text-lg">
                  {faq.question}
                  <ChevronDown className="text-slate-400 transition-transform duration-300 group-open:rotate-180" size={24} />
                </summary>
                <div className="text-slate-600 pb-6 px-6 leading-relaxed text-base border-t border-slate-100 pt-4 mt-2">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="bg-[#09090b] rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/30 via-transparent to-transparent" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Eleva el ritmo de tu equipo</h2>
            <p className="text-slate-400 mb-12 text-lg md:text-xl leading-relaxed">
              Únete a miles de profesionales que ya han dejado atrás el caos. No necesitas tarjeta de crédito para empezar.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => router.push("/register")} className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Crear cuenta gratis
              </button>
              <button onClick={() => router.push("/contact")} className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                Hablar con ventas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer y Bot */}
      <FaqBot faqEntries={faqEntries} />
    </div>
  );
}