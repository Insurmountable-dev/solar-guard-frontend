
import { Skeleton, SkeletonText } from "../ui/Skeleton";

function LoadingSection({ titleWidth = "w-48", children }) {
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5 sm:p-6">
                <Skeleton className={`h-6 ${titleWidth}`} />
                <Skeleton className="mt-2 h-4 w-64 max-w-full bg-slate-100" />
            </div>
            {children}
        </section>
    );
}

function SummarySkeleton() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="mt-5 h-5 w-28" />
            <Skeleton className="mt-3 h-7 w-36" />
            <Skeleton className="mt-2 h-3 w-40 bg-slate-100" />
        </div>
    );
}

export default function HouseholdLoadingDetailsPage() {
    return (
        <div className="space-y-8 animate-pulse">

            {/* Household Profile Header */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <Skeleton className="h-16 w-16 shrink-0 rounded-2xl" />

                        <div className="flex-1">
                            <Skeleton className="h-7 w-64 max-w-full" />
                            <Skeleton className="mt-3 h-4 w-48" />
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Skeleton className="h-7 w-24 rounded-full" />
                                <Skeleton className="h-7 w-28 rounded-full" />
                            </div>
                        </div>

                        <Skeleton className="h-10 w-32 rounded-xl" />
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SummarySkeleton key={i} />
                ))}
            </div>

            {/* Household Information */}
            <LoadingSection titleWidth="w-56">
                <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 sm:p-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-100 p-4">
                            <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-3 w-28 bg-slate-100" />
                                <Skeleton className="h-5 w-40 max-w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </LoadingSection>

            {/* Roof & House Measurements */}
            <LoadingSection titleWidth="w-64">
                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="rounded-xl bg-slate-50 p-4">
                            <Skeleton className="h-3 w-28 bg-slate-200" />
                            <Skeleton className="mt-3 h-8 w-32" />
                        </div>
                    ))}
                </div>

                {/* Area Displays */}
                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="rounded-xl border border-slate-100 p-5">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="mt-4 h-8 w-36" />
                            <Skeleton className="mt-3 h-3 w-44 bg-slate-100" />
                        </div>
                    ))}
                </div>

                {/* Roof Details */}
                <div className="px-5 pb-3">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="mt-2 h-4 w-64 max-w-full bg-slate-100" />
                </div>

                <div className="grid grid-cols-1 gap-3 p-5 pt-2 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-100 p-4">
                            <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-3 w-28 bg-slate-100" />
                                <Skeleton className="h-5 w-36" />
                            </div>
                        </div>
                    ))}
                </div>
            </LoadingSection>

            {/* Household Appliances */}
            <LoadingSection titleWidth="w-56">
                {/* Statistics */}
                <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="rounded-xl bg-slate-50 p-4">
                            <Skeleton className="h-3 w-24 bg-slate-200" />
                            <Skeleton className="mt-3 h-7 w-12" />
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto p-5 pt-0">
                    <div className="min-w-[750px]">
                        <div className="flex gap-6 border-b border-slate-200 py-4">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <Skeleton key={i} className="h-4 flex-1 bg-slate-100" />
                            ))}
                        </div>

                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-6 border-b border-slate-100 py-5">
                                {Array.from({ length: 7 }).map((_, j) => (
                                    <Skeleton key={j} className={`h-4 flex-1 ${j === 0 ? "max-w-32" : "max-w-20"} bg-slate-100`} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </LoadingSection>

            {/* Bottom Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
                <Skeleton className="h-11 w-full rounded-xl sm:w-44" />
                <Skeleton className="h-11 w-full rounded-xl sm:w-40" />
            </div>

        </div>
    );
};
