"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
    X,
    Plus,
    Calendar,
    Users,
    ListTodo,
    AlertCircle,
    LayoutGrid,
    Type,
    BarChart3
} from "lucide-react";
import useProjectStore from "../../../store/useProjectStore";

type NewProjectForm = {
    nombre: string;
    descripcion: string;
    estado: string;
    prioridad: string;
    progreso: string;
    fechaInicio: string;
    fechaFin: string;
    equipo: string;
    tareas: string;
};

interface CreateProjectModalProps {
    onClose: () => void;
}

export default function CreateProjectModal({ onClose }: CreateProjectModalProps) {
    const createProject = useProjectStore((s) => s.createProject);
    const [createError, setCreateError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const [formData, setFormData] = useState<NewProjectForm>({
        nombre: "",
        descripcion: "",
        estado: "Pendiente",
        prioridad: "Media",
        progreso: "0",
        fechaInicio: "",
        fechaFin: "",
        equipo: "",
        tareas: "",
    });

    const handleCreateInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateProject = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCreateError(null);
        setIsCreating(true);
        try {
            const equipo = formData.equipo.split(",").map(i => i.trim()).filter(Boolean);
            const tareas = formData.tareas.split("\n").map(i => i.trim()).filter(Boolean)
                .map((nombre, index) => ({ id: index + 1, nombre, completado: false }));

            await createProject({
                ...formData,
                progreso: Number(formData.progreso) || 0,
                equipo,
                tareas,
            });

            onClose();
        } catch (error) {
            setCreateError(error instanceof Error ? error.message : "Error al crear el proyecto");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-300">

                {/* Header con Estilo */}
                <div className="relative bg-slate-50 px-8 py-6 border-b border-slate-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <span className="p-2 bg-blue-600 rounded-lg text-white">
                                    <LayoutGrid size={20} />
                                </span>
                                Nuevo Proyecto
                            </h3>
                            <p className="text-slate-500 text-sm mt-1">Define los detalles y el equipo de trabajo.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Formulario con Scroll si es necesario */}
                <form onSubmit={handleCreateProject} className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Sección: Información Principal */}
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider">
                                <Type size={16} /> Información General
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre del Proyecto</label>
                                    <input
                                        required
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleCreateInputChange}
                                        placeholder="Ej: Rediseño de E-commerce"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Progreso (%)</label>
                                    <div className="relative">
                                        <BarChart3 className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                        <input
                                            name="progreso"
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={formData.progreso}
                                            onChange={handleCreateInputChange}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Descripción</label>
                                <textarea
                                    required
                                    name="descripcion"
                                    rows={2}
                                    value={formData.descripcion}
                                    onChange={handleCreateInputChange}
                                    placeholder="¿De qué trata este proyecto?"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* Sección: Estado y Prioridad */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Estado actual</label>
                            <select
                                name="estado"
                                value={formData.estado}
                                onChange={handleCreateInputChange}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none appearance-none cursor-pointer"
                            >
                                <option value="Pendiente">⏳ Pendiente</option>
                                <option value="En progreso">🚀 En progreso</option>
                                <option value="Completado">✅ Completado</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Prioridad</label>
                            <select
                                name="prioridad"
                                value={formData.prioridad}
                                onChange={handleCreateInputChange}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none appearance-none cursor-pointer"
                            >
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta 🔥</option>
                            </select>
                        </div>

                        {/* Sección: Cronograma */}
                        <div className="md:col-span-2 pt-2">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
                                <Calendar size={16} /> Cronograma
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-xs font-semibold text-slate-500 uppercase ml-1 mb-1">Fecha de Inicio</label>
                                    <input
                                        required
                                        type="date"
                                        name="fechaInicio"
                                        value={formData.fechaInicio}
                                        onChange={handleCreateInputChange}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="block text-xs font-semibold text-slate-500 uppercase ml-1 mb-1">Fecha de Entrega</label>
                                    <input
                                        required
                                        type="date"
                                        name="fechaFin"
                                        value={formData.fechaFin}
                                        onChange={handleCreateInputChange}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sección: Equipo y Tareas */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider">
                                <Users size={16} /> Equipo
                            </div>
                            <input
                                name="equipo"
                                value={formData.equipo}
                                onChange={handleCreateInputChange}
                                placeholder="Nombres separados por comas"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider">
                                <ListTodo size={16} /> Tareas Iniciales
                            </div>
                            <textarea
                                name="tareas"
                                value={formData.tareas}
                                onChange={handleCreateInputChange}
                                placeholder="Una tarea por línea"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>

                    {createError && (
                        <div className="mt-6 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 animate-shake">
                            <AlertCircle size={18} />
                            {createError}
                        </div>
                    )}

                    {/* Footer del Formulario */}
                    <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="group relative flex items-center gap-2 px-8 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all disabled:opacity-70 shadow-lg shadow-blue-200 active:scale-95"
                        >
                            {isCreating ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Crear Proyecto
                                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}