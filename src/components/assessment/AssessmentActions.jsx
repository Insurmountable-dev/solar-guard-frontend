import { ArrowLeft, ArrowRight, Save, Loader2 } from "lucide-react";
import Button from "../common/Button";

export default function AssessmentActions({onBack, onSaveExit, onContinue, isSaving = true, backDisabled = false, continueLabel = "Continue",}) {
    return (

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur">

            <div className="mx-auto flex w-full max-w-6xl min-w-0 items-center justify-between gap-2 sm:px-3">

                <Button
                    type="button"
                    onClick={onBack}
                    variant = "outline"
                    disabled={isSaving || backDisabled}
                    aria-label="Back"
                    classname="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 sm:px-4"
                >
                    <ArrowLeft className="h-4 w-4 shrink-0" />
                    <span className="hidden min-[380px]:inline">Back</span>
                </Button>


                <div className="flex min-w-0 items-center gap-2 sm:gap-3">

                    <Button
                        type="button"
                        onClick={onSaveExit}
                        disabled={isSaving}
                        variant="secondary"
                        classname="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 sm:px-4"
                    >
                        <Save className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span className="truncate">
                            Save<span className="hidden sm:inline"> &amp; exit</span>
                        </span>
                    </Button>

                    <Button
                        type="button"
                        onClick={onContinue}
                        variant="primary"
                        disabled={isSaving}
                        classname="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-60 sm:px-6"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                {continueLabel}
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </Button>

                </div>
            </div>

        </div>

    );
}