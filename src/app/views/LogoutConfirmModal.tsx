"use client";

interface LogoutConfirmModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function LogoutConfirmModal({ onConfirm, onCancel }: LogoutConfirmModalProps) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4">
            <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
                <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </div>
                    <p className="text-base font-semibold text-slate-900">¿Cerrar sesión?</p>
                </div>
                <p className="mb-5 text-sm text-slate-500">Si eliges <span className="font-medium text-slate-700">Cancelar</span>, permanecerás en el dashboard.</p>
                <div className="flex items-center justify-end gap-2">
                    <button type="button" onClick={onCancel} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100">Cancelar</button>
                    <button type="button" onClick={onConfirm} className="rounded-xl bg-[#FF7400] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e46800]">Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
}
