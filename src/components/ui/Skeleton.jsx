
/** Base building block: a pulsing gray shape. */
export function Skeleton({ className = "" }) {
    return (
        <div aria-hidden="true" className={`animate-pulse rounded bg-slate-200 ${className}`} />
    );
}

/** Several text lines, last one shorter. */
export function SkeletonText({ lines = 3, className = "" }) {
    return (
        <div className={`space-y-2 ${className}`}>

            {/* Create An Array from */}
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton  key={i}  className={`h-4 bg-slate-100 ${i === lines - 1 && lines > 1 ? "w-2/3" : "w-full"}`}/>
            ))}

        </div>
    );
}

/** Card with title, subtitle, a grid of stat blocks and optional footer button. */
export function SkeletonCard({stats = 4, columns = 2, footer = true,className = "",}) {

    const gridCols = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[columns] ?? "grid-cols-2";

    return (
        <div className={`flex h-full min-h-[320px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`} >
            <Skeleton className="h-6 w-56 max-w-full" />
            <Skeleton className="mt-2 h-4 w-72 max-w-full bg-slate-100" />

            <div className={`mt-6 grid flex-1 auto-rows-fr gap-4 ${gridCols}`}>
                {Array.from({ length: stats }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="min-h-[96px] rounded-xl bg-slate-100"
                    />
                ))}
            </div>

            {footer && <Skeleton className="mt-6 h-10 w-full rounded-xl" />}
        </div>
    );
}

/** List of rows with an avatar and two text lines. */
export function SkeletonList({ rows = 4, className = "" }) {
    return (
        <div
            className={`space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
        >
            <Skeleton className="h-6 w-48" />
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/2 bg-slate-100" />
                        <Skeleton className="h-3 w-1/3 bg-slate-100" />
                    </div>
                </div>
            ))}
        </div>
    );
}