"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import useProjectStore from "../../../store/useProjectStore"; // Ajusta esta ruta según tu estructura

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
            const equipo = formData.equipo
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
            const tareas = formData.tareas
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean)
                .map((nombre, index) => ({
                    id: index + 1,
                    nombre,
                    completado: false,
                }));

            await createProject({
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                estado: formData.estado,
                prioridad: formData.prioridad,
                progreso: Number(formData.progreso) || 0,
                fechaInicio: formData.fechaInicio,
                fechaFin: formData.fechaFin,
                equipo,
                tareas,
            });

            onClose(); // Cierra el modal en caso de éxito
        } catch (error) {
            setCreateError(error instanceof Error ? error.message : "No se pudo crear el proyecto");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 animate-in zoom-in-95 duration-200">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-blue-950">Crear Proyecto</h3>
                        <p className="text-sm text-slate-500 mt-1">Este proyecto se guardará en la base de datos.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-700 text-xl leading-none"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleCreateProject} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            required
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleCreateInputChange}
                            placeholder="Nombre del proyecto"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-shadow"
                        />
                        <div className="flex flex-col gap-1">
                            <input
                                name="progreso"
                                type="number"
                                min={0}
                                max={100}
                                value={formData.progreso}
                                onChange={handleCreateInputChange}
                                placeholder="Progreso (0-100)"
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-shadow"
                            />
                        </div>
                    </div>

                    <textarea
                        required
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleCreateInputChange}
                        placeholder="Descripción"
                        rows={3}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-shadow"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleCreateInputChange}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-shadow"
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="En progreso">En progreso</option>
                            <option value="Completado">Completado</option>
                        </select>
                        <select
                            name="prioridad"
                            value={formData.prioridad}
                            onChange={handleCreateInputChange}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-shadow"
                        >
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            required
                            name="fechaInicio"
                            type="date"
                            value={formData.fechaInicio}
                            onChange={handleCreateInputChange}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-shadow text-slate-600"
                        />
                        <input
                            required
                            name="fechaFin"
                            type="date"
                            value={formData.fechaFin}
                            onChange={handleCreateInputChange}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-shadow text-slate-600"
                        />
                    </div>

                    <input
                        name="equipo"
                        value={formData.equipo}
                        onChange={handleCreateInputChange}
                        placeholder="Equipo (separado por comas)"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-shadow"
                    />

                    <textarea
                        name="tareas"
                        value={formData.tareas}
                        onChange={handleCreateInputChange}
                        placeholder="Tareas (una por línea)"
                        rows={4}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-shadow"
                    />

                    {createError && (
                        <p className="text-sm text-red-600 font-medium bg-red-50 p-2 rounded-lg border border-red-100">{createError}</p>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-200 text-slate-600 hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="px-6 py-2 rounded-lg bg-blue-950 text-white font-medium hover:bg-blue-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-900/20 flex items-center gap-2"
                        >
                            {isCreating ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                "Guardar proyecto"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}