import React, { useEffect } from "react";
import { Loader2, AlertTriangle } from "lucide-react";


const VARIANTS = {
    danger: {
        iconWrap: "bg-rose-50",
        icon: "text-rose-600",
        confirm: "bg-rose-600 hover:bg-rose-700"
    },
    primary: {
        iconWrap: "bg-emerald-50",
        icon: "text-emerald-600",
        confirm: "bg-emerald-600 hover:bg-emerald-700"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
            onClick={() => !isLoading && onCancel()}
        >

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >

                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${styles.iconWrap}`}>
                    <Icon className={`h-5 w-5 ${styles.icon}`} />
                </div>


                <h2
                    id="confirm-dialog-title"
                    className="mt-4 text-lg font-bold text-slate-900"
                >
                    {title}
                </h2>


                {message && (
                    <p className="mt-1 text-sm text-slate-500">
                        {message}
                    </p>
                )}


                <div className="mt-6 flex gap-3">

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        autoFocus
                        className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        {cancelLabel}
                    </button>


                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-70 ${styles.confirm}`}
                    >
                        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isLoading ? loadingLabel : confirmLabel}
                    </button>

                </div>

            </div>

        </div>

    );

}