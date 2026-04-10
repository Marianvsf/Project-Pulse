"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import FaqBot from "../components/FaqBot";

type FAQEntry = {
  id: number;
  question: string;
  answer: string;
  keywords: string[];
};

const faqEntries: FAQEntry[] = [
  {
    id: 1,
    question: "¿Cómo funciona la seguridad y privacidad?",
    answer:
      "Usamos cifrado AES-256, backups automáticos diarios y controles de acceso por rol para proteger toda la información.",
    keywords: ["seguridad", "privacidad", "cifrado", "datos", "backup"],
  },
  {
    id: 2,
    question: "¿Puedo cancelar mi plan en cualquier momento?",
    answer:
      "Sí. Puedes cancelar en cualquier momento desde tu cuenta, sin penalización ni contratos a largo plazo.",
    keywords: ["cancelar", "plan", "suscripcion", "pago", "facturacion"],
  },
  {
    id: 3,
    question: "¿Se integra con otras herramientas?",
    answer:
      "Sí. Tenemos integración con Slack, Google Workspace, GitHub y más herramientas mediante API y Zapier.",
    keywords: ["integracion", "slack", "github", "google", "zapier", "api"],
  },
  {
    id: 4,
    question: "¿Qué incluye el plan Starter?",
    answer:
      "El plan Starter incluye hasta 3 proyectos activos, tareas ilimitadas, colaboradores básicos y app móvil.",
    keywords: ["starter", "gratis", "incluye", "proyectos", "tareas"],
  },
  {
    id: 5,
    question: "¿Qué incluye el plan Pro Team?",
    answer:
      "Pro Team incluye todo lo de Starter, más proyectos ilimitados, asistente IA, permisos avanzados y soporte prioritario 24/7.",
    keywords: ["pro", "team", "precio", "planes", "soporte", "ia"],
  },
  {
    id: 6,
    question: "¿Cómo empiezo a usar Project Pulse?",
    answer:
      "Puedes crear una cuenta gratis, configurar tu primer proyecto y empezar a invitar miembros del equipo en pocos minutos.",
    keywords: ["empezar", "registro", "cuenta", "crear", "inicio"],
  },
];

export default function HomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const images = ["/assets/fot1.jpg", "/assets/fot2.jpg", "/assets/fot3.jpg"];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, currentSlide]);

  return (
    <div className="relative bg-white font-sans antialiased text-slate-900 selection:bg-blue-200">
      <div className="relative z-50">
        <Navbar />
      </div>
      <header className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden group">
        <div className="absolute inset-0 z-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image src={image} alt="Hero Background" fill className="object-cover" priority={index === 0} />
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px]" />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
          aria-label="Imagen anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
          aria-label="Siguiente imagen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir a la imagen ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-4xl px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium">Gestión de proyectos v1.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Tus proyectos, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
              en un solo latido.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Project-Pulse unifica tareas, equipos y cronogramas. La herramienta definitiva para dejar de &quot;sobrevivir&quot; al trabajo y empezar a liderarlo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => router.push("/register")} className="h-14 w-full sm:w-60 bg-[#FF7400] hover:bg-[#e66900] text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-lg shadow-orange-500/20">
              Empezar Gratis
            </button>
            <button onClick={() => router.push("/login")} className="h-14 w-full sm:w-60 bg-white/10 border border-white/20 backdrop-blur-md text-white font-semibold rounded-2xl hover:bg-white/20 transition-all">
              Ver Demo
            </button>
          </div>
        </div>
      </header>

      <section className="relative -mt-12 z-30 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">+30%</p>
              <p className="text-slate-500 text-sm font-medium mt-2 uppercase tracking-wide">Eficiencia</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">10k+</p>
              <p className="text-slate-500 text-sm font-medium mt-2 uppercase tracking-wide">Proyectos</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">24/7</p>
              <p className="text-slate-500 text-sm font-medium mt-2 uppercase tracking-wide">Soporte</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-black text-[#FF7400] tracking-tight">4.9/5</p>
              <p className="text-slate-500 text-sm font-medium mt-2 uppercase tracking-wide">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID: FUNCIONALIDADES CLAVE --- */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">Potencia tu flujo de trabajo</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Diseñado para la velocidad, construido para la colaboración. Todo lo que necesitas en una interfaz limpia y sin distracciones.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta Grande 1 */}
            <div className="md:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group cursor-default">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Panel de Control Intuitivo</h3>
                <p className="text-slate-500 max-w-md leading-relaxed">Visualiza el progreso de tu equipo con métricas en tiempo real y dashboards que se adaptan a tu forma de trabajar.</p>
              </div>
              <div className="mt-12 bg-slate-50 rounded-xl border border-slate-200/60 h-48 w-full group-hover:scale-[1.02] transition-transform duration-500 shadow-inner relative overflow-hidden">
                {/* Decoración abstracta para simular UI */}
                <div className="absolute top-4 left-4 right-4 h-8 bg-white rounded-lg border border-slate-100 shadow-sm" />
                <div className="absolute top-16 left-4 right-4 h-24 bg-white rounded-lg border border-slate-100 shadow-sm flex gap-4 p-4">
                  <div className="w-1/3 h-full bg-blue-50 rounded-md" />
                  <div className="w-2/3 h-full bg-slate-50 rounded-md" />
                </div>
              </div>
            </div>

            {/* Tarjeta Métrica IA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-xl shadow-blue-900/20 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <span className="text-7xl font-black mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200">10x</span>
              <h3 className="text-lg font-bold mb-2">Velocidad IA</h3>
              <p className="text-blue-100/80 text-sm leading-relaxed">Aceleración en la entrega de tareas repetitivas mediante nuestra inteligencia artificial integrada.</p>
            </div>

            {/* Tarjeta Automatización */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-[#FF7400]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Piloto Automático</h3>
              <p className="text-slate-500 leading-relaxed">Configura flujos de trabajo que se ejecutan solos. Asigna tareas basadas en estados sin mover un dedo.</p>
            </div>

            {/* Tarjeta Larga Inferior */}
            <div className="md:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-slate-900/30 overflow-hidden relative">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="flex-1 relative z-10">
                <h3 className="text-2xl font-bold mb-3">Colaboración en tiempo real</h3>
                <p className="text-slate-400 leading-relaxed max-w-md">Menciones, hilos de comentarios y edición de documentos en vivo. Resuelve dudas sin salir de la plataforma y mantén el contexto siempre.</p>
              </div>
              <div className="relative z-10 bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
                <div className="flex -space-x-4 mb-4">
                  {['JM', 'AR', 'LC', 'FT'].map((initials, i) => (
                    <div key={i} className={`w-12 h-12 rounded-full border-4 border-slate-900 flex items-center justify-center text-sm font-bold shadow-lg ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-orange-500' : 'bg-purple-500'
                      }`}>
                      {initials}
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 shadow-lg">
                    +3
                  </div>
                </div>
                <div className="h-2 w-32 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN COMPARATIVA: ANTES Y DESPUÉS --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">La diferencia es evidente</h2>
            <p className="text-slate-500 text-lg">Deja atrás las herramientas que te frenan.</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Insignia VS central */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full items-center justify-center shadow-xl border border-slate-100 z-20 font-black text-slate-400">
              VS
            </div>

            {/* El Caos */}
            <div className="bg-slate-50 rounded-[2rem] p-10 md:p-12 border border-slate-200/60">
              <div className="w-12 h-12 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">El caos habitual</h3>
              <ul className="space-y-6">
                <li className="flex gap-4 text-slate-600">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Buscando en hilos de Slack interminables de hace 3 días.</span>
                </li>
                <li className="flex gap-4 text-slate-600">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Hojas de Excel llamadas &quot;Presupuesto_V3_FINAL_FINAL2.xlsx&quot;.</span>
                </li>
                <li className="flex gap-4 text-slate-600">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Reuniones de sincronización de 1 hora que podrían ser un mail.</span>
                </li>
              </ul>
            </div>

            {/* Con Project Pulse */}
            <div className="bg-slate-900 rounded-[2rem] p-10 md:p-12 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-8">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-8">Con Project Pulse</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4 text-slate-300">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>Una única fuente de verdad. Si está en Pulse, es la versión actual.</span>
                  </li>
                  <li className="flex gap-4 text-slate-300">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>Notificaciones inteligentes que solo te avisan cuando es necesario.</span>
                  </li>
                  <li className="flex gap-4 text-slate-300">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>Claridad absoluta sobre quién hace qué y para cuándo.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRECIOS --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Planes simples y transparentes</h2>
          <p className="text-slate-500 text-lg mb-16 max-w-2xl mx-auto">Empieza gratis, mejora cuando tu equipo lo necesite. Sin sorpresas.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter */}
            <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-200/60 shadow-lg shadow-slate-200/20 hover:shadow-xl transition-all flex flex-col text-left">
              <h3 className="text-2xl font-bold text-slate-900">Starter</h3>
              <p className="text-slate-500 mt-2 mb-6">Perfecto para individuos y pequeños proyectos.</p>
              <div className="text-5xl font-black text-slate-900 mb-2">$0</div>
              <p className="text-sm font-medium text-slate-400 mb-8 uppercase tracking-wide">Gratis para siempre</p>

              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-slate-600"><svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Hasta 3 proyectos activos</li>
                <li className="flex items-center gap-3 text-slate-600"><svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Tareas ilimitadas</li>
                <li className="flex items-center gap-3 text-slate-600"><svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Colaboradores básicos</li>
                <li className="flex items-center gap-3 text-slate-600"><svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> App móvil</li>
              </ul>
              <button className="w-full py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all">Empezar con Starter</button>
            </div>

            {/* Pro */}
            <div className="bg-slate-900 p-10 md:p-12 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 relative flex flex-col text-left overflow-hidden ring-1 ring-white/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute top-8 right-8 bg-gradient-to-r from-[#FF7400] to-[#e66900] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">Más Popular</div>

              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold">Pro Team</h3>
                <p className="text-slate-400 mt-2 mb-6">Para equipos que necesitan escalar su productividad.</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black">$15</span>
                  <span className="text-slate-400">/usuario/mes</span>
                </div>
                <p className="text-sm font-medium text-slate-500 mb-8 uppercase tracking-wide">Facturado anualmente</p>

                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-slate-300"><svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Todo lo de Starter, más:</li>
                  <li className="flex items-center gap-3 text-slate-300"><svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Proyectos ilimitados</li>
                  <li className="flex items-center gap-3 text-slate-300"><svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Asistente de IA (100 prompts/mes)</li>
                  <li className="flex items-center gap-3 text-slate-300"><svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Permisos avanzados</li>
                  <li className="flex items-center gap-3 text-slate-300"><svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Soporte prioritario 24/7</li>
                </ul>
                <button className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30">Prueba gratuita de 14 días</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-slate-500">Respuestas rápidas para las dudas más comunes.</p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqEntries.slice(0, 3).map((faq) => (
              <details
                key={faq.id}
                className="group bg-slate-50 rounded-2xl border border-slate-200/60 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-slate-900">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </summary>
                <div className="text-slate-600 pb-6 px-6 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-800">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent mix-blend-overlay" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF7400]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Eleva el ritmo de tu equipo</h2>
            <p className="text-blue-100/80 mb-10 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Únete a más de 10,000 profesionales que ya han dejado atrás el caos y han recuperado su tiempo. No necesitas tarjeta de crédito para empezar.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => router.push("/register")} className="bg-[#FF7400] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#e66900] hover:scale-105 transition-all shadow-lg shadow-[#FF7400]/30">
                Crear cuenta gratis
              </button>
              <button onClick={() => router.push("/contact")} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                Hablar con ventas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER MODERNO --- */}
      <footer className="bg-white border-t border-slate-200/60 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="font-black text-xl tracking-tight mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white">P</span>
                Project Pulse
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                La herramienta definitiva para unificar tareas, equipos y cronogramas en un solo latido.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Producto</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Integraciones</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Recursos</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Guías</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Comunidad</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Empresa</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Empleo</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <FaqBot faqEntries={faqEntries} />
    </div>
  );
}