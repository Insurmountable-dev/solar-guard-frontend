import { ArrowLeft, ArrowRight, Save, LoaderCircle } from "lucide-react";

export default function AssessmentActions({
    onContinue,
    onBack,
    onSaveExit,
    backDisabled = false,
    continueDisabled = false,
    continueLabel = "Continue",
    backLabel = "Back",
    isSaving = false,
}) {
    return (
        <div className="flex w-full items-center justify-between gap-2 py-3 sm:gap-4 sm:py-4">
            {/* Back button */}
            <button
                type="button"
                onClick={onBack}
                disabled={backDisabled || isSaving}
                className={[
                    "inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5",
                    "rounded-xl border border-slate-300 bg-white px-3",
                    "text-sm font-semibold text-slate-700",
                    "transition-colors duration-200",
                    "hover:border-slate-400 hover:bg-slate-50",
                    "focus:outline-none focus-visible:ring-2",
                    "focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
                    "active:bg-slate-100",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    "sm:gap-2 sm:px-4",
                ].join(" ")}
            >
                <ArrowLeft size={17} aria-hidden="true" />
                <span>{backLabel}</span>
            </button>

            {/* Save and continue actions */}
                <button
                    type="button"
                    onClick={onContinue}
                    disabled={isSaving || continueDisabled}
                    className={[
                        "inline-flex min-h-11 shrink-0 items-center justify-center gap-2",
                        "rounded-xl bg-emerald-700 px-3.5",
                        "text-sm font-semibold text-white",
                        "shadow-sm shadow-emerald-900/10",
                        "transition-colors duration-200",
                        "hover:bg-emerald-800",
                        "focus:outline-none focus-visible:ring-2",
                        "focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
                        "active:bg-emerald-900",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "sm:px-5",
                    ].join(" ")}
                >
                    <span>{isSaving ? "Please wait..." : continueLabel}</span>

                    {isSaving ? (
                        <LoaderCircle
                            size={17}
                            className="animate-spin"
                            aria-hidden="true"
                        />
                    ) : (
                        <ArrowRight size={17} aria-hidden="true" />
                    )}
                    
                </button>

        </div>
    );
}