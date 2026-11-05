
import { Sun, CalendarDays, RefreshCw, Clock, CheckCircle2, Eye, ArrowRight, Calculator, Sparkles,} from "lucide-react";
import { formatDate } from "../../utils/charts/formatters";
import Buttons from "../common/Button";

const STATUS_STYLES = {
    draft: {
        label: "Draft",
        icon: Clock,
        badge: "bg-slate-100 text-slate-600 ring-slate-200",
        progress: 1,
        description: "Continue setting up your assessment.",
    },

     completed: {
        label: "Completed",
        icon: CheckCircle2,
        badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        progress: 2,
        description: "Your solar sizing results are ready.",
    },

    reviewed: {
        label: "Reviewed",
        icon: Eye,
        badge: "bg-amber-50 text-amber-700 ring-amber-200",
        progress:3,
        description: "Your assessment has been reviewed.",
    },

   
};

const STEPS = ["Draft", "Completed"];

export default function AssessmentCard({
    assessmentId,
    status = "draft",
    householdName = "Unnamed household",
    createdAt,
    updatedAt,
    onViewResults,
    onCalculate
}) {

    const normalizedStatus = String(status).toLowerCase();

    const current = STATUS_STYLES[normalizedStatus] ?? {
        label: "Unavailabe...",
        icon: Clock,
        badge: "bg-slate-100 text-slate-600 ring-slate-200",
        progress: 0,
        description: "The assessment status is unavailable.",
    };

    const StatusIcon = current.icon;
    const isCompleted = normalizedStatus === "completed";

    return (

        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-900/5">

            {/* Top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />

            <div className="relative flex flex-1 flex-col p-5 sm:p-6">

                {/* Header */}
                <div className="flex items-start justify-between gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-900/15 transition-transform duration-300 group-hover:scale-105">
                        <Sun size={23} strokeWidth={1.8} />
                    </div>

                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${current.badge}`}
                    >
                        <StatusIcon size={14} />
                        {current.label}
                    </span>

                </div>

                {/* Household details */}
                <div className="mt-5">

                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        Household assessment
                    </p>

                    <h3
                        title={householdName}
                        className="truncate text-lg font-bold tracking-tight text-slate-900"
                    >
                        {householdName}
                    </h3>

                    {assessmentId != null && (
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100/80 px-2.5 py-1 shadow-[inset_0_1px_3px_rgba(15,23,42,0.10)]">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                ID
                            </span>

                            <span className="font-mono text-[11px] font-semibold tracking-wide text-slate-500 [text-shadow:0_1px_0_white]">
                                #{assessmentId}
                            </span>
                        </div>
                    )}

                </div>

                {/* Progress */}
                <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/80 p-4">

                    <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-700">
                            Assessment progress
                        </span>

                        <span className="text-xs font-bold tabular-nums text-emerald-700">
                            {current.progress === 0
                                ? "—"
                                : `${Math.round((current.progress / STEPS.length) * 100)}%`}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">

                        {STEPS.map((step, index) => {

                            const active = index < current.progress;

                            return (
                                <div
                                    key={step}
                                    title={step}
                                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                                        active
                                            ? "bg-emerald-500"
                                            : "bg-slate-200"
                                    }`}
                                />
                            );
                        })}
                    </div>

                    <p className="mt-3 text-xs leading-5 text-slate-500">
                        {current.description}
                    </p>

                </div>

                {/* Dates */}
                <div className="mt-4 grid grid-cols-2 gap-3">

                    <div className="min-w-0 rounded-xl border border-slate-100 p-3">

                        <div className="flex items-center gap-1.5 text-slate-400">
                            <CalendarDays size={14} />
                            <span className="text-[11px] font-medium">
                                Created
                            </span>
                        </div>

                        <p className="mt-2 truncate text-xs font-semibold text-slate-700">
                            {formatDate(createdAt)}
                        </p>

                    </div>

                    <div className="min-w-0 rounded-xl border border-slate-100 p-3">

                        <div className="flex items-center gap-1.5 text-slate-400">
                            <RefreshCw size={14} />
                            <span className="text-[11px] font-medium">
                                Last updated
                            </span>
                        </div>

                        <p className="mt-2 truncate text-xs font-semibold text-slate-700">
                            {formatDate(updatedAt)}
                        </p>

                    </div>

                </div>

               {/* Action */}
                <div className="mt-auto pt-5">
            

                    {isCompleted  ?

                        <Buttons
                            icon={Eye}
                            type="button"
                            onClick={() => onViewResults?.()}
                            classname={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                            isCompleted
                                ? "bg-slate-900 text-white shadow-sm hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-600/20"
                                : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100"
                        }`}
                        
                        >
                           View solar results
                            <ArrowRight
                                size={16}
                                className="ml-auto transition-transform group-hover:translate-x-1"
                            />
                        </Buttons>

                    :
                    
                        <Buttons
                            icon={Calculator}
                            type="button"
                            variant="primary"
                            onClick={() => onCalculate?.()}
                            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 `}
                        >
                           Calculate results
                          <ArrowRight size={16} className="ml-auto" />

                        </Buttons>}

                </div>

            </div>

        </article>
        
    );
}
