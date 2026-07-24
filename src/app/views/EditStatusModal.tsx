"use client";

import type { Project } from "../../../store/useProjectStore";

interface EditStatusModalProps {
    project: Project;
    value: string;
    onChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    isSaving: boolean;
    error: string | null;
}

const getStatusOptions = (currentStatus?: string) => {
    const baseOptions = ["Pendiente", "En progreso", "Completado"];
    if (currentStatus && !baseOptions.includes(currentStatus)) {
        return [currentStatus, ...baseOptions];
    }
    return baseOptions;
};

export default function EditStatusModal({ project, value, onChange, onSave, onCancel, isSaving, error }: EditStatusModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        <p className="text-sm font-semibold text-slate-900">Editar estado</p>
                        <p className="mt-1 text-xs text-slate-500">{project.nombre}</p>
                    </div>
                    <button type="button" onClick={onCancel} className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">Cerrar</button>
                </div>
                <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500">
                    {getStatusOptions(project.estado).map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                {error && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</p>}
                <div className="mt-5 flex items-center justify-end gap-2">
                    <button type="button" onClick={onCancel} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100">Cancelar</button>
                    <button type="button" disabled={isSaving} onClick={onSave} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
                        {isSaving ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
