
/* ───────────────────────── Decorative helpers ───────────────────────── */

export function GridTexture() {
    return (
        <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:20px_20px]"
        />
    );
}

export function PanelGlows() {
    return (
        <>
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-emerald-300/30 blur-3xl"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-teal-300/20 blur-3xl"
            />
        </>
    );
}

export function CornerTicks({ className = "border-white/40" }) {
    return (
        <>
            <span aria-hidden="true" className={`pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 border-l-2 border-t-2 ${className}`} />
            <span aria-hidden="true" className={`pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r-2 border-t-2 ${className}`} />
            <span aria-hidden="true" className={`pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b-2 border-l-2 ${className}`} />
            <span aria-hidden="true" className={`pointer-events-none absolute bottom-3 right-3 h-2.5 w-2.5 border-b-2 border-r-2 ${className}`} />
        </>
    );
}

export function LiveDot({ className = "" }) {
    return (
        <span aria-hidden="true" className={`relative flex h-2 w-2 ${className}`}>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
    );
}
