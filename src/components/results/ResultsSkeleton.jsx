
import { Skeleton } from "../ui/Skeleton";

function EquipmentSkeleton({ specifications = 4, showImage = false }) {
    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5">
            {/* Section heading */}
            <div className="mb-5 flex items-center gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-36 max-w-full" />
                    <Skeleton className="h-3 w-48 max-w-full" />
                </div>
            </div>

            {showImage && (
                <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <div className="space-y-3 rounded-xl border border-slate-100 p-4">
                        <Skeleton className="h-5 w-3/4 max-w-full" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-4/5 max-w-full" />
                        <Skeleton className="mt-4 h-8 w-2/3 max-w-full" />
                    </div>
                </div>
            )}

            {/* Specifications */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Array.from({ length: specifications }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-slate-100 p-3"
                    >
                        <Skeleton className="mb-3 h-3 w-24 max-w-full bg-slate-100" />
                        <Skeleton className="h-4 w-32 max-w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ResultsSkeleton() {
    return (
        <section
            role="status"
            aria-label="Loading assessment results"
            aria-busy="true"
            className="flex flex-col gap-5"
        >
            {/* Main assessment card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                {/* Emerald accent */}
                <Skeleton className="h-1 w-full rounded-none" />

                <div className="flex flex-col gap-5 p-5 sm:p-6">
                    {/* Assessment header */}
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 items-center gap-3">
                            <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
                            <div className="min-w-0 flex-1 space-y-2">
                                <Skeleton className="h-5 w-44 max-w-full" />
                                <Skeleton className="h-3 w-56 max-w-full" />
                            </div>
                        </div>

                        <Skeleton className="h-7 w-24 shrink-0 rounded-full" />
                    </div>

                    {/* Completion banner */}
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 sm:p-5">
                        <Skeleton className="mb-3 h-3 w-32 bg-emerald-100" />
                        <Skeleton className="mb-3 h-6 w-56 max-w-full" />
                        <Skeleton className="mb-2 h-3 w-full bg-emerald-100" />
                        <Skeleton className="h-3 w-4/5 max-w-full bg-emerald-100" />
                    </div>

                    {/* Solar readings / SunPath */}
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5">
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <Skeleton className="h-5 w-36 max-w-full" />
                            <Skeleton className="h-4 w-16" />
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-slate-100 bg-white p-4"
                                >
                                    <Skeleton className="mb-4 h-9 w-9 rounded-lg" />
                                    <Skeleton className="mb-3 h-3 w-28 max-w-full bg-slate-100" />
                                    <Skeleton className="h-7 w-24 max-w-full" />
                                    <Skeleton className="mt-2 h-3 w-20 bg-slate-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Solar panel recommendation */}
                    <EquipmentSkeleton
                        specifications={4}
                        showImage={true}
                    />

                    {/* Battery recommendation */}
                    <EquipmentSkeleton specifications={4} />

                    {/* Inverter recommendation */}
                    <EquipmentSkeleton specifications={4} />

                    {/* Roof details */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5">
                        <div className="mb-5 flex items-center gap-3">
                            <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                            <div className="min-w-0 flex-1 space-y-2">
                                <Skeleton className="h-4 w-32 max-w-full" />
                                <Skeleton className="h-3 w-48 max-w-full" />
                            </div>
                        </div>

                        <Skeleton className="mb-4 h-36 w-full rounded-xl" />

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-slate-100 p-3"
                                >
                                    <Skeleton className="mb-3 h-3 w-24 max-w-full bg-slate-100" />
                                    <Skeleton className="h-4 w-32 max-w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <span className="sr-only">
                Loading your solar assessment results. Please wait.
            </span>
        </section>
    );
};
