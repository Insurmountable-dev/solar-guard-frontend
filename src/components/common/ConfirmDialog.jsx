import { useEffect } from "react";
import { Loader2, AlertTriangle } from "lucide-react";


const VARIANTS = {
    danger: {
        bar: "from-rose-300 via-rose-500 to-rose-300",
        glow: "bg-rose-400/25",
        iconWrap: "from-rose-50 to-rose-100 ring-rose-200/70",
        icon: "text-rose-600",
        confirm: "bg-gradient-to-br from-rose-500 to-rose-600 shadow-rose-500/30 hover:from-rose-600 hover:to-rose-700 focus-visible:ring-rose-500",
        shadow: "shadow-rose-900/10",
        panel: "border-rose-200 bg-gradient-to-br from-rose-50 via-white to-rose-50/60",
        rail: "from-rose-400 to-rose-600",
        panelGlow: "bg-rose-200/50",
        panelText: "text-rose-950/80"
    },
    primary: {
        bar: "from-emerald-300 via-emerald-500 to-emerald-300",
        glow: "bg-emerald-400/25",
        iconWrap: "from-emerald-50 to-emerald-100 ring-emerald-200/70",
        icon: "text-emerald-600",
        confirm: "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/30 hover:from-emerald-600 hover:to-emerald-700 focus-visible:ring-emerald-500",
        shadow: "shadow-emerald-900/10",
        panel: "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60",
        rail: "from-emerald-400 to-teal-500",
        panelGlow: "bg-emerald-200/50",
        panelText: "text-emerald-950/80"
    }
};


export default function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    loadingLabel = "Please wait...",
    icon: Icon = AlertTriangle,
    variant = "danger",
    isLoading = false,
    onConfirm,
    onCancel
}) {

    const styles = VARIANTS[variant] ?? VARIANTS.danger;


    useEffect(() => {

        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape" && !isLoading) onCancel();
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);

    }, [isOpen, isLoading, onCancel]);


    if (!isOpen) return null;


    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-3 backdrop-blur-sm sm:px-4"
            style={{ animation: "confirm-fade 0.2s ease-out" }}
            onClick={() => !isLoading && onCancel()}
        >

            <style>{`
                @keyframes confirm-fade {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes confirm-pop {
                    0%   { transform: scale(0.92) translateY(8px); opacity: 0; }
                    100% { transform: scale(1)    translateY(0);   opacity: 1; }
                }
            `}</style>

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                style={{ animation: "confirm-pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                className={`relative w-full max-w-md overflow-hidden rounded-3xl bg-white px-4 pb-5 pt-9 text-center shadow-2xl ring-1 ring-slate-100 sm:px-7 sm:pb-7 ${styles.shadow}`}
                onClick={(event) => event.stopPropagation()}
            >

                {/* Accent bar */}
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${styles.bar}`} />


                {/* Icon */}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center">

                    <div className={`absolute inset-0 rounded-full blur-md ${styles.glow}`} />

                    <div className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ring-4 ${styles.iconWrap}`}>
                        <Icon className={`h-7 w-7 ${styles.icon}`} strokeWidth={2.25} />
                    </div>

                </div>


                <h2 id="confirm-dialog-title" className="mt-5 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">{title}</h2>


                {/* Highlighted message panel */}
                {message && (
                    <div className={`relative mt-4 overflow-hidden rounded-2xl border py-4 pl-5 pr-4 text-left shadow-sm sm:py-5 sm:pl-6 sm:pr-5 ${styles.panel}`}>

                        {/* left accent rail */}
                        <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${styles.rail}`} />

                        {/* soft corner glow */}
                        <span aria-hidden="true" className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl ${styles.panelGlow}`} />

                        <p className={`relative text-sm font-medium leading-relaxed sm:text-base ${styles.panelText}`}>
                            {message}
                        </p>

                    </div>
                )}


                {/* Buttons: cancel collapses while loading, confirm fills the row */}
                <div
                    className="mt-6 grid transition-[grid-template-columns] duration-300 ease-out sm:mt-7"
                    style={{ gridTemplateColumns: isLoading ? "0fr 1fr" : "1fr 1fr" }}
                >

                    <div className="min-w-0 overflow-hidden" aria-hidden={isLoading}>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isLoading}
                            tabIndex={isLoading ? -1 : 0}
                            autoFocus
                            className={`mr-3 w-[calc(100%-0.75rem)] whitespace-nowrap rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed ${
                                isLoading ? "opacity-0" : "opacity-100"
                            }`}
                        >
                            {cancelLabel}
                        </button>
                    </div>


                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        aria-busy={isLoading}
                        className={`flex min-w-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80 ${styles.confirm}`}
                    >
                        {isLoading && (
                            <Loader2 className="h-[18px] w-[18px] shrink-0 animate-spin" strokeWidth={2.5} />
                        )}
                        <span className="truncate">{isLoading ? loadingLabel : confirmLabel}</span>
                    </button>

                </div>

            </div>

        </div>

    );

}