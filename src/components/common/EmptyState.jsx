
import { AlertTriangleIcon } from "lucide-react";

export default function EmptyState({
    title,
    description,
    icon: Icon = AlertTriangleIcon,
    action,
    animated = true,
    variant = "default",
    className = "",
}) {

    const isDanger = variant === "danger";

    const styles = {

        container: isDanger
            ? "border-red-200 bg-gradient-to-br from-white via-red-50/60 to-white"
            : "border-emerald-200 bg-gradient-to-br from-white via-emerald-50/50 to-white",

        glowTop: isDanger
            ? "bg-red-200/40"
            : "bg-emerald-200/40",

        glowBottom: isDanger
            ? "bg-rose-200/30"
            : "bg-teal-200/30",

        animation: isDanger
            ? "bg-red-300/30"
            : "bg-emerald-300/30",

        iconBadge: isDanger
            ? "bg-red-100 text-red-600 shadow-[0_8px_20px_-8px_rgba(239,68,68,0.4)] ring-red-50"
            : "bg-emerald-100 text-emerald-700 shadow-[0_8px_20px_-8px_rgba(16,185,129,0.6)] ring-emerald-50",

        title: isDanger
            ? "text-red-800"
            : "text-emerald-700",

        description: isDanger
            ? "text-red-700/75"
            : "text-slate-500",

        divider: isDanger
            ? "via-red-300"
            : "via-emerald-300",

    };

    return (

        <div
            className={`relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-dashed px-6 py-10 text-center sm:py-12 ${styles.container} ${className}`}
        >

            {/* decorative soft glow */}
            <span
                aria-hidden="true"
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${styles.glowTop}`}
            />

            <span
                aria-hidden="true"
                className={`pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full blur-3xl ${styles.glowBottom}`}
            />

            {/* icon badge */}
            <div aria-hidden="true" className="relative flex h-16 w-16 items-center justify-center">

                {animated && (
                    <span className={`absolute inset-0 animate-ping rounded-2xl ${styles.animation}`} />
                )}

                <span className={`relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm ring-4 ${styles.iconBadge}`}>
                    <Icon size={28} strokeWidth={2.25} />
                </span>

            </div>

            {/* title */}
            <p className={`relative font-mono text-sm font-extrabold uppercase tracking-[0.15em] sm:text-base ${styles.title}`}>
                {title}
            </p>

            {/* optional description */}
            {description && (
                <p className={`relative max-w-sm text-sm leading-relaxed ${styles.description}`}>
                    {description}
                </p>
            )}

            {/* decorative divider */}
            <span
                aria-hidden="true"
                className={`relative h-px w-24 bg-gradient-to-r from-transparent ${styles.divider} to-transparent`}
            />

            {/* optional action */}
            {action && <div className="relative">{action}</div>}

        </div>

    );
}
