"use client"

import { useState, FormEvent } from "react";
import UserNavbar from "../components/navbar/UserNavbar";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | "idle" | "sending" | "success" | "error">(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Placeholder: simula envío. Reemplazar por API real si se desea.
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 max-w-[900px] mx-auto">
      <UserNavbar onSearch={() => {}} />

      <main className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-blue-950 mb-2">Soporte Técnico</h1>
        <p className="text-slate-600 mb-6">Rellena el formulario y nuestro equipo se pondrá en contacto contigo.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border px-4 py-2" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border px-4 py-2" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-xl border px-4 py-2 h-28" required />
          </div>

          {status === "error" && <p className="text-sm text-red-600">Error al enviar. Intenta de nuevo.</p>}
          {status === "success" && <p className="text-sm text-green-600">Mensaje enviado. Te contactaremos pronto.</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={status === "sending"} className="rounded-xl bg-blue-600 text-white px-4 py-2 disabled:opacity-70">
              {status === "sending" ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
