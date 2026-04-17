"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    SESSION_ACTIVE_USER_WINDOW_MS,
    SESSION_ACTIVITY_REFRESH_THROTTLE_MS,
    SESSION_WARNING_WINDOW_MS,
} from "@/lib/session";

const formatRemaining = (milliseconds: number) => {
    if (milliseconds < 60 * 1000) {
        const totalSeconds = Math.max(1, Math.ceil(milliseconds / 1000));
        return `${totalSeconds} segundo${totalSeconds === 1 ? "" : "s"}`;
    }

    const totalMinutes = Math.max(1, Math.ceil(milliseconds / 60000));

    if (totalMinutes < 60) {
        return `${totalMinutes} minuto${totalMinutes === 1 ? "" : "s"}`;
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} h ${minutes.toString().padStart(2, "0")} min`;
};

export default function SessionTimeoutManager() {
    const { data: session, status, update } = useSession();
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [remaining, setRemaining] = useState(0);
    const [isExtending, setIsExtending] = useState(false);
    const warnedForExpiryRef = useRef<string | null>(null);
    const lastUserActivityAtRef = useRef(Date.now());
    const lastAutoRefreshAtRef = useRef(0);
    const isAutoRefreshingRef = useRef(false);

    const expiresAt = useMemo(() => {
        if (!session?.expires) {
            return null;
        }

        const value = new Date(session.expires).getTime();
        return Number.isNaN(value) ? null : value;
    }, [session?.expires]);

    useEffect(() => {
        if (status !== "authenticated" || expiresAt === null) {
            setIsWarningOpen(false);
            setRemaining(0);
            warnedForExpiryRef.current = null;
            return;
        }

        const refreshState = () => {
            const timeLeft = expiresAt - Date.now();
            setRemaining(Math.max(0, timeLeft));

            if (timeLeft <= 0) {
                void signOut({ callbackUrl: "/login" });
                return;
            }

            if (
                timeLeft <= SESSION_WARNING_WINDOW_MS
                && warnedForExpiryRef.current !== session.expires
            ) {
                warnedForExpiryRef.current = session.expires;
                setIsWarningOpen(true);
            }
        };

        refreshState();
        const interval = window.setInterval(refreshState, 1000);

        return () => window.clearInterval(interval);
    }, [expiresAt, session?.expires, status]);

    useEffect(() => {
        if (status !== "authenticated") {
            return;
        }

        const markActivity = () => {
            lastUserActivityAtRef.current = Date.now();
        };

        const markVisibleActivity = () => {
            if (document.visibilityState === "visible") {
                markActivity();
            }
        };

        const events: Array<keyof WindowEventMap> = [
            "click",
            "keydown",
            "mousemove",
            "scroll",
            "touchstart",
            "focus",
        ];

        events.forEach((eventName) => {
            window.addEventListener(eventName, markActivity, { passive: true });
        });
        document.addEventListener("visibilitychange", markVisibleActivity);

        return () => {
            events.forEach((eventName) => {
                window.removeEventListener(eventName, markActivity);
            });
            document.removeEventListener("visibilitychange", markVisibleActivity);
        };
    }, [status]);

    useEffect(() => {
        if (status !== "authenticated" || expiresAt === null) {
            return;
        }

        const tryAutoRefresh = async () => {
            const now = Date.now();
            const timeLeft = expiresAt - now;

            if (timeLeft <= 0) {
                return;
            }

            const isUserRecentlyActive =
                now - lastUserActivityAtRef.current <= SESSION_ACTIVE_USER_WINDOW_MS;
            const isWithinWarningWindow = timeLeft <= SESSION_WARNING_WINDOW_MS;
            const hasPassedThrottleWindow =
                now - lastAutoRefreshAtRef.current >= SESSION_ACTIVITY_REFRESH_THROTTLE_MS;

            if (
                !isUserRecentlyActive
                || !isWithinWarningWindow
                || !hasPassedThrottleWindow
                || isAutoRefreshingRef.current
            ) {
                return;
            }

            isAutoRefreshingRef.current = true;
            try {
                await update();
                lastAutoRefreshAtRef.current = Date.now();
                warnedForExpiryRef.current = null;
                setIsWarningOpen(false);
            } finally {
                isAutoRefreshingRef.current = false;
            }
        };

        void tryAutoRefresh();
        const interval = window.setInterval(() => {
            void tryAutoRefresh();
        }, 5000);

        return () => window.clearInterval(interval);
    }, [expiresAt, status, update]);

    const handleExtendSession = async () => {
        setIsExtending(true);
        try {
            await update();
            warnedForExpiryRef.current = null;
            setIsWarningOpen(false);
        } finally {
            setIsExtending(false);
        }
    };

    if (status !== "authenticated" || !isWarningOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-6 shadow-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#FF7400]">Sesión por expirar</p>
                <h2 className="mt-3 text-2xl font-bold text-slate-900">Tu sesión está por terminar</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                    Te quedan {formatRemaining(remaining)}. Si quieres seguir trabajando sin perder tu progreso, puedes extender la sesión ahora.
                </p>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={() => void signOut({ callbackUrl: "/login" })}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        Cerrar sesión
                    </button>
                    <button
                        type="button"
                        onClick={() => void handleExtendSession()}
                        disabled={isExtending}
                        className="inline-flex items-center justify-center rounded-xl bg-[#FF7400] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e06500] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isExtending ? "Extendiendo..." : "Extender sesión"}
                    </button>
                </div>
            </div>
        </div>
    );
}