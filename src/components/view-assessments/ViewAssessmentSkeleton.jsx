
import { Skeleton } from "../ui/Skeleton";

export function AssessmentSkeleton({ count = 3 }) {
    return (
        <div
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
            aria-label="Loading assessments"
            aria-busy="true"
            role="status"
        >
            {Array.from({ length: count }).map((_, index) => (
                <article
                    key={index}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
                >
                    {/* Top accent */}
                    <Skeleton className="h-1 w-full rounded-none bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-300" />

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                        {/* Header: Icon and status */}
                        <div className="flex items-start justify-between gap-3">
                            <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />

                            <Skeleton className="h-7 w-24 shrink-0 rounded-full" />
                        </div>

                        {/* Household details */}
                        <div className="mt-5">
                            <Skeleton className="mb-2 h-3 w-32 bg-slate-100" />
                            <Skeleton className="h-6 w-3/4 max-w-full" />

                            {/* Assessment ID */}
                            <Skeleton className="mt-3 h-6 w-24 rounded-md" />
                        </div>

                        {/* Assessment progress */}
                        <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                            <div className="mb-3 flex items-center justify-between gap-2">
                                <Skeleton className="h-3 w-32 bg-slate-100" />
                                <Skeleton className="h-3 w-10 bg-emerald-100" />
                            </div>

                            {/* Progress steps */}
                            <div className="flex items-center gap-1.5">
                                {Array.from({ length: 2 }).map((_, stepIndex) => (
                                    <Skeleton
                                        key={stepIndex}
                                        className="h-1.5 flex-1 rounded-full"
                                    />
                                ))}
                            </div>

                            {/* Status description */}
                            <Skeleton className="mt-4 h-3 w-full bg-slate-100" />
                            <Skeleton className="mt-2 h-3 w-3/4 bg-slate-100" />
                        </div>

                        {/* Dates */}
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="min-w-0 rounded-xl border border-slate-100 p-3">
                                <div className="flex items-center gap-1.5">
                                    <Skeleton className="h-3.5 w-3.5 rounded-sm" />
                                    <Skeleton className="h-3 w-12 bg-slate-100" />
                                </div>
                                <Skeleton className="mt-3 h-4 w-full" />
                            </div>

                            <div className="min-w-0 rounded-xl border border-slate-100 p-3">
                                <div className="flex items-center gap-1.5">
                                    <Skeleton className="h-3.5 w-3.5 rounded-sm" />
                                    <Skeleton className="h-3 w-20 bg-slate-100" />
                                </div>
                                <Skeleton className="mt-3 h-4 w-full" />
                            </div>
                        </div>

                        {/* Action button */}
                        <div className="mt-auto pt-5">
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                    </div>
                </article>
            ))}

            <span className="sr-only">
                Loading assessments. Please wait.
            </span>
        </div>
    );
}

export default AssessmentSkeleton;
