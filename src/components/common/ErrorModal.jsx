import { useEffect, useRef } from "react";
import { AlertTriangle, AlertCircle, ArrowRight, X } from "lucide-react";

export default function ErrorModal({
    open = false,
    title = "Something needs your attention",
    message = "We can't continue until this is resolved.",
    issues = [],// e.g. ["Add at least one appliance", "Enter your roof area"]
    issuesLabel = "To continue, fix the following",
    tag = "Action required",
    icon: Icon = AlertTriangle,
    actionLabel = "Fix it now",
    onAction,
    secondaryLabel,
    onSecondary,
    onClose,
    dismissible = false,
}) {

    const actionRef = useRef(null);

    // Lock page scroll, focus the primary action, and handle Escape (only if dismissible)
    useEffect(() => {

        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        actionRef.current?.focus();

        const handleKeyDown = (e) => {
            if (e.key === "Escape" && dismissible) onClose?.();
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, [open, dismissible, onClose]);

    if (!open) return null;

    return (

        <div
            className="fixed inset-0 z-[9999] flex h-dvh w-full items-center justify-center overflow-y-auto overscroll-contain bg-slate-900/70 p-4 backdrop-blur-md sm:p-6"
            onClick={dismissible ? onClose : undefined}
        >

            {/* ambient red glow behind the card */}
            <span
                aria-hidden="true"
                className="pointer-events-none fixed left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/20 blur-3xl"
            />

            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="error-modal-title"
                aria-describedby="error-modal-message"
                onClick={(e) => e.stopPropagation()}
                className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(225,29,72,0.55)] ring-1 ring-white/10 motion-safe:animate-[fadeIn_200ms_ease-out]"
            >

                {/* ───────── Hero ───────── */}
                <div className="relative flex flex-col items-center gap-5 overflow-hidden bg-gradient-to-br from-rose-600 via-rose-600 to-red-700 px-6 pb-9 pt-10 text-center text-white sm:px-8 sm:pt-12">

                    {/* decorative grid */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:20px_20px]"
                    />

                    {/* decorative glows */}
                    <span aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-rose-300/30 blur-3xl" />
                    <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />

                    {/* corner ticks */}
                    <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 border-l-2 border-t-2 border-white/40" />
                    <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r-2 border-t-2 border-white/40" />
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b-2 border-l-2 border-white/40" />
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-2.5 w-2.5 border-b-2 border-r-2 border-white/40" />

                    {/* optional close button */}
                    {dismissible && (
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm transition-all duration-200 hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-90"
                        >
                            <X size={18} strokeWidth={2.5} />
                        </button>
                    )}

                    {/* icon badge with pulse + dashed orbit */}
                    <div aria-hidden="true" className="relative flex h-24 w-24 items-center justify-center">
                        <span className="absolute inset-0 rounded-3xl bg-white/20 motion-safe:animate-ping [animation-duration:2.5s]" />
                        <span className="absolute -inset-3 rounded-[2rem] border border-dashed border-white/35" />
                        <span className="relative flex h-full w-full items-center justify-center rounded-3xl bg-white text-rose-600 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.4)] ring-4 ring-white/25">
                            <Icon size={42} strokeWidth={2.25} />
                        </span>
                    </div>

                    {/* tag */}
                    {tag && (
                        <span className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-60 motion-safe:animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                            </span>
                            {tag}
                        </span>
                    )}

                </div>

                {/* ───────── Content ───────── */}
                <div className="relative flex flex-col gap-6 p-6 sm:p-8">

                    {/* soft corner glow */}
                    <span aria-hidden="true" className="pointer-events-none absolute -right-12 top-0 h-36 w-36 rounded-full bg-rose-100/70 blur-3xl" />

                    <div className="relative flex flex-col items-center gap-2.5 text-center">

                        <h2 id="error-modal-title" className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                            {title}
                        </h2>

                        {message && (
                            <p id="error-modal-message" className="max-w-sm text-sm leading-relaxed text-slate-500 sm:text-base">
                                {message}
                            </p>
                        )}

                    </div>

                    {/* issues checklist */}
                    {issues.length > 0 && (
                        <div className="relative flex flex-col gap-3 rounded-2xl border border-dashed border-rose-200 bg-gradient-to-br from-rose-50/70 via-white to-amber-50/50 p-4 sm:p-5">

                            <p className="font-mono text-[10px] font-extrabold uppercase tracking-[0.2em] text-rose-700">
                                {issuesLabel}
                            </p>

                            <ul className="flex flex-col gap-2.5">
                                {issues.map((issue, i) => (
                                    <li
                                        key={`${issue}-${i}`}
                                        className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 pl-4 text-left shadow-sm"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-rose-400 to-red-500"
                                        />
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600 ring-1 ring-rose-200">
                                            <AlertCircle size={14} strokeWidth={2.5} />
                                        </span>
                                        <span className="min-w-0 flex-1 text-sm font-semibold leading-relaxed text-slate-700">
                                            {issue}
                                        </span>
                                        <span aria-hidden="true" className="font-mono text-[10px] font-bold tracking-widest text-slate-300">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    )}

                    {/* actions */}
                    <div className="relative flex flex-col-reverse gap-3 border-t border-dashed border-slate-200 pt-6 sm:flex-row sm:justify-end">

                        {secondaryLabel && (
                            <button
                                type="button"
                                onClick={onSecondary ?? onClose}
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 active:scale-95"
                            >
                                {secondaryLabel}
                            </button>
                        )}

                        <button
                            ref={actionRef}
                            type="button"
                            onClick={onAction ?? onClose}
                            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_16px_32px_-12px_rgba(225,29,72,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(225,29,72,0.9)] focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-200 active:scale-95"
                        >
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                            />
                            <span className="relative">{actionLabel}</span>
                            <ArrowRight size={17} strokeWidth={2.5} className="relative transition-transform duration-200 group-hover:translate-x-1" />
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}