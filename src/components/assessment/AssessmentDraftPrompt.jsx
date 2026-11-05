import { useEffect, useRef, useState, useCallback} from "react";
import { Home,RotateCcw, ArrowRight, FilePlus2, Sun, Clock } from "lucide-react";

import Button from "../common/Button";
import Loader from "../ui/Loader";

import { useNavigate,Link} from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import   useAssessments  from "../../hooks/pages/useAssessments";
import ConfirmDialog from "../common/ConfirmDialog";


export default function AssessmentDraftPrompt() {

    const { currentUser } = useAuth();
    const   navigate = useNavigate();

    const {

        draft, 
        isDraftLoading,
        isDeletingDraft,
        isOpen,
        setIsOpen,
        hasDraft,
        totalSteps, 
        visible,
        setVisible,
        handlePreviousAssessment:onContinue,
        handleNewAssessment

    } = useAssessments();

  

    const continueRef = useRef(null);

    const onClose = useCallback(() => {
        navigate("/dashboard");
    }, [navigate]);

    const percent = Math.min(100, Math.max(0, Math.round((Number(draft?.current_step || 0) / (Number(totalSteps) || 1)) * 100)));

    useEffect(() => {

        if (!hasDraft) {
            setVisible(false);
            return;
        }

        const frame = requestAnimationFrame(() => {
            setVisible(true);
            continueRef.current?.focus();
        });

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            cancelAnimationFrame(frame);
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };

    }, [hasDraft, onClose]);

    if (!hasDraft) return null;


    if(isOpen) {
        return(

            <ConfirmDialog 
                isOpen={isOpen}
                onCancel={() => setIsOpen(false)}
                onConfirm={handleNewAssessment}
                title = "Leave Current Assessment?"
                message = "Are you sure ? Your current assessment draft will be permanently deleted, and you may lose the information you have entered."
                confirmLabel = "Leave Assessment"
                cancelLabel = "Return To Previous.."
                loadingLabel = "Deleting Draft..."
                isLoading={isDeletingDraft}
            />
        )
    }


    return (

        <div
            className={`fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none sm:items-center sm:p-4 ${visible ? "opacity-100" : "opacity-0" }`}
            onMouseDown={(event) => {if (event.target === event.currentTarget && onClose) onClose();}}
        >

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="resume-assessment-title"
                aria-describedby="resume-assessment-description"
                className={`flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl shadow-slate-950/30 ring-1 ring-slate-900/5 transition-all duration-300 ease-out motion-reduce:transition-none sm:max-h-[min(88dvh,700px)] sm:rounded-3xl ${
                    visible
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-6 scale-95 opacity-0"
                }`}
            >

                {/* Header */}
                <div className="relative isolate shrink-0 overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 px-5 pb-5 pt-5 sm:px-8 sm:pb-8 sm:pt-8">

                    {/* Decorative sun */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-amber-300/25 blur-3xl sm:h-48 sm:w-48" />
                        <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full border border-amber-200/20 sm:h-36 sm:w-36" />
                        <div className="absolute right-0 top-0 h-20 w-20 rounded-full border border-amber-200/25 sm:h-24 sm:w-24" />
                        <Sun
                            className="absolute right-5 top-5 h-9 w-9 text-amber-300 sm:right-7 sm:h-16 sm:w-16"
                            strokeWidth={1.25}
                        />
                    </div>

                    <div className="relative">

                        <Link  to ="/dashboard" aria-label="Return to dashboard" className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white shadow-lg shadow-emerald-950/20 ring-1 ring-inset ring-white/25 backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:mb-5 sm:h-14 sm:w-14 sm:rounded-2xl">
                            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <h2
                            id="resume-assessment-title"
                            className="max-w-[85%] text-xl font-bold tracking-tight text-white sm:max-w-full sm:text-[1.7rem]"
                        >
                            Welcome Back{currentUser?.first_name ? `, ${currentUser.first_name}` : ""}!
                        </h2>

                        <p
                            id="resume-assessment-description"
                            className="mt-2 max-w-sm text-sm leading-5 text-emerald-50/85 sm:leading-6"
                        >
                            We found an assessment you previously started.
                            Would you like to continue where you left off
                            or start a new assessment?
                        </p>

                    </div>

                </div>

                {/* Body */}
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:p-8">

                    {/* Draft summary (only when draft details are provided) */}
                    {draft && (
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5 sm:p-4">

                            <div className="flex items-start justify-between gap-3">

                                <div className="min-w-0 flex-1">
                                    {draft?.household_data?.household_name && (
                                        <p className="break-words text-sm font-semibold text-slate-900">
                                            {draft.household_data.household_name}
                                        </p>
                                    )}

                                    {draft?.updated_at && (
                                        <p className="mt-1 inline-flex flex-wrap items-center gap-1.5 text-xs leading-5 text-slate-500">
                                            <Clock className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                                            <span>Last saved {new Date(draft.updated_at).toLocaleString()}</span>
                                        </p>
                                    )}
                                </div>

                                {percent !== null && (
                                    <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100">
                                        Step {draft.current_step} of {totalSteps}
                                    </span>
                                )}
                            </div>

                            {percent !== null && (
                                <div
                                    className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-emerald-100"
                                    role="progressbar"
                                    aria-valuenow={percent}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label="Assessment progress"
                                >
                                    <div
                                        className="h-full rounded-full bg-emerald-600 transition-all duration-700 ease-out motion-reduce:transition-none"
                                        style={{ width: visible ? `${percent}%` : "0%" }}
                                    />
                                </div>
                            )}

                        </div>
                    )}

                    <Button
                        ref={continueRef}
                        type="button"
                        variant ="outline"
                        onClick={onContinue}
                        className="group flex min-h-[76px] w-full items-center gap-3 rounded-xl border-2 border-emerald-500 bg-emerald-50/60 p-3.5 text-left shadow-sm shadow-emerald-600/10 transition duration-200 hover:bg-emerald-50 hover:shadow-md hover:shadow-emerald-600/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30 active:scale-[0.99] motion-reduce:transition-none sm:gap-4 sm:rounded-xl sm:p-4"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 transition duration-200 group-hover:scale-105 motion-reduce:transition-none sm:h-12 sm:w-12">
                           {isDraftLoading? <Loader/> : <RotateCcw size={23} />}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold leading-5 text-slate-900 sm:text-base">
                                Continue Previous Assessment
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                                Resume from your last saved step and keep your existing information.
                            </p>
                        </div>

                        <ArrowRight
                            size={20}
                            className="shrink-0 text-emerald-600 transition group-hover:translate-x-1 motion-reduce:transition-none"
                        />
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        variant ={"outline"}
                        className="group flex min-h-[76px] w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-left transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md hover:shadow-slate-900/5 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/25 active:scale-[0.99] motion-reduce:transition-none sm:gap-4 sm:p-4"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition duration-200 group-hover:scale-105 motion-reduce:transition-none sm:h-12 sm:w-12">
                            <FilePlus2 size={23} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold leading-5 text-slate-900 sm:text-base">
                                Start a New Assessment
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                                Start fresh with a new household assessment.
                            </p>
                        </div>

                        <ArrowRight
                            size={20}
                            className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700 motion-reduce:transition-none"
                        />
                    </Button>

                    <p className="px-2 pt-1 pb-1 text-center text-xs leading-5 text-slate-400">
                        Your existing draft remains saved unless you choose to replace or discard it.
                    </p>

                </div>

            </div>

        </div>

    );
}  