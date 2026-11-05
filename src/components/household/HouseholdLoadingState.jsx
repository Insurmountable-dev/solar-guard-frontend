import { Skeleton, SkeletonText } from "../ui/Skeleton";

export default function HouseholdLoadingState() {

    return (

        <main className="min-h-screen bg-slate-50/50">

            <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">

                {/* Page Heading */}
                <section className="space-y-2">

                    <Skeleton className="h-8 w-56" />

                    <Skeleton className="h-4 w-80 max-w-full bg-slate-100" />

                </section>


                {/* Summary Cards */}
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {Array.from({ length: 3 }).map((_, index) => (

                        <div
                            key={index}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                        >

                            <div className="flex items-start justify-between">

                                <div className="flex-1 space-y-3">

                                    <Skeleton className="h-4 w-32 bg-slate-100" />

                                    <Skeleton className="h-8 w-20" />

                                    <Skeleton className="h-3 w-40 bg-slate-100" />

                                </div>

                                <Skeleton className="h-11 w-11 rounded-xl" />

                            </div>

                        </div>

                    ))}

                </section>


                {/* Household Section */}
                <section className="space-y-6">

                    {/* Household Cards */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {Array.from({ length: 6 }).map((_, index) => (

                            <article
                                key={index}
                                className="flex min-h-[320px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >

                                {/* Card Header */}
                                <div className="flex items-center justify-between gap-4">

                                    <div className="flex min-w-0 flex-1 items-center gap-3">

                                        <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />

                                        <div className="min-w-0 flex-1 space-y-2">

                                            <Skeleton className="h-4 w-36 max-w-full" />

                                            <Skeleton className="h-3 w-44 max-w-full bg-slate-100" />

                                        </div>

                                    </div>

                                    <Skeleton className="h-6 w-20 shrink-0 rounded-full" />

                                </div>


                                {/* Energy Status */}
                                <div className="mt-5 grid grid-cols-2 gap-3">

                                    {Array.from({ length: 2 }).map((_, i) => (

                                        <div
                                            key={i}
                                            className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3"
                                        >

                                            <Skeleton className="h-6 w-6 shrink-0 rounded-md" />

                                            <div className="flex-1 space-y-2">

                                                <Skeleton className="h-3 w-20 bg-slate-100" />

                                                <Skeleton className="h-4 w-16" />

                                            </div>

                                        </div>

                                    ))}

                                </div>


                                {/* Household Stats */}
                                <div className="mt-4 grid grid-cols-3 divide-x divide-slate-100 rounded-xl border border-slate-100 py-3">

                                    {Array.from({ length: 3 }).map((_, i) => (

                                        <div
                                            key={i}
                                            className="flex flex-col items-center gap-2"
                                        >

                                            <Skeleton className="h-4 w-4 rounded" />

                                            <Skeleton className="h-5 w-8" />

                                            <Skeleton className="h-3 w-14 bg-slate-100" />

                                        </div>

                                    ))}

                                </div>


                                {/* Property Tags */}
                                <div className="mt-4 flex gap-2">

                                    <Skeleton className="h-6 w-20 rounded-md" />

                                    <Skeleton className="h-6 w-24 rounded-md" />

                                </div>


                                {/* Footer Action */}
                                <div className="mt-auto border-t border-slate-100 pt-4">

                                    <Skeleton className="h-11 w-full rounded-xl" />

                                </div>

                            </article>

                        ))}

                    </div>


                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-slate-200 pt-6">

                        <Skeleton className="h-4 w-36 bg-slate-100" />

                        <div className="flex gap-2">

                            {Array.from({ length: 4 }).map((_, index) => (

                                <Skeleton
                                    key={index}
                                    className="h-9 w-9 rounded-lg"
                                />

                            ))}

                        </div>

                    </div>

                </section>

            </div>

        </main>

    );

}