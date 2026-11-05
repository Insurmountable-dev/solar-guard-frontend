import { Check, CheckCheck, Pencil, X } from "lucide-react";

/* Full class names only, so Tailwind can detect them. */
const VARIANTS = {

    default: {
        soft: "bg-slate-100 text-slate-600 border-slate-200",
        outline: "bg-transparent text-slate-600 border-slate-300",
        solid: "bg-slate-600 text-white border-slate-600",
        dot: "bg-slate-400",
    },
    brand: {
        soft: "bg-[#edf5ef] text-[#24583c] border-[#d5e5db]",
        outline: "bg-transparent text-[#24583c] border-[#24583c]/40",
        solid: "bg-[#24583c] text-white border-[#24583c]",
        dot: "bg-[#24583c]",
    },
    success: {
        soft: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
        outline: "bg-transparent text-emerald-700 border-emerald-400/60",
        solid: "bg-emerald-600 text-white border-emerald-600",
        dot: "bg-emerald-500",
    },
    warning: {
        soft: "bg-amber-50 text-amber-700 border-amber-200/80",
        outline: "bg-transparent text-amber-700 border-amber-400/60",
        solid: "bg-amber-500 text-white border-amber-500",
        dot: "bg-amber-500",
    },
    danger: {
        soft: "bg-rose-50 text-rose-700 border-rose-200/80",
        outline: "bg-transparent text-rose-700 border-rose-400/60",
        solid: "bg-rose-600 text-white border-rose-600",
        dot: "bg-rose-500",
    },
    info: {
        soft: "bg-sky-50 text-sky-700 border-sky-200/80",
        outline: "bg-transparent text-sky-700 border-sky-400/60",
        solid: "bg-sky-600 text-white border-sky-600",
        dot: "bg-sky-500",
    },
    purple: {
        soft: "bg-violet-50 text-violet-700 border-violet-200/80",
        outline: "bg-transparent text-violet-700 border-violet-400/60",
        solid: "bg-violet-600 text-white border-violet-600",
        dot: "bg-violet-500",
    },
};

const SIZES = {
    xs: { box: "px-1.5 py-0.5 text-[9px] gap-1", icon: "h-2.5 w-2.5", dot: "h-1 w-1" },
    sm: { box: "px-2 py-0.5 text-[10px] gap-1", icon: "h-3 w-3", dot: "h-1.5 w-1.5" },
    md: { box: "px-2.5 py-1 text-xs gap-1.5", icon: "h-3.5 w-3.5", dot: "h-1.5 w-1.5" },
    lg: { box: "px-3 py-1.5 text-sm gap-2", icon: "h-4 w-4", dot: "h-2 w-2" },
};

const SHAPES = {
    pill: "rounded-full",
    rounded: "rounded-md",
    square: "rounded-none",
};

export default function Badge({
    children,
    variant = "default", // default | brand | success | warning | danger | info | purple
    appearance = "soft", // soft | outline | solid
    size = "md", // xs | sm | md | lg
    shape = "pill", // pill | rounded | square
    icon: Icon,
    iconPosition = "left", // left | right
    dot = false,
    uppercase = false,
    onRemove,
    removeLabel = "Remove",
    className = "",
    ...rest
}) {
    const v = VARIANTS[variant] ?? VARIANTS.default;
    const s = SIZES[size] ?? SIZES.md;

    const iconEl = Icon && (
        <Icon className={`${s.icon} shrink-0`} strokeWidth={2.5} aria-hidden="true" />
    );

    return (
        <span
            className={[
                "inline-flex shrink-0 select-none items-center whitespace-nowrap border font-medium leading-none",
                v[appearance] ?? v.soft,
                s.box,
                SHAPES[shape] ?? SHAPES.pill,
                uppercase ? "font-semibold uppercase tracking-wide" : "",
                className,
            ].join(" ")}
            {...rest}
        >
            {dot && (
                <span
                    className={`${s.dot} shrink-0 rounded-full ${
                        appearance === "solid" ? "bg-white/90" : v.dot
                    }`}
                    aria-hidden="true"
                />
            )}
            {iconPosition === "left" && iconEl}
            <span>{children}</span>
            {iconPosition === "right" && iconEl}

            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    aria-label={removeLabel}
                    className="-mr-0.5 ml-0.5 inline-flex shrink-0 items-center justify-center rounded-full opacity-60 transition hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
                >
                    <X className={s.icon} strokeWidth={2.5} aria-hidden="true" />
                </button>
            )}
        </span>
    );
}

/* ---------- Presets ---------- */

const STATUS_PRESETS = {
    draft: { label: "Draft", variant: "warning", icon: Pencil },
    completed: { label: "Completed", variant: "success", icon: Check },
    reviewed: { label: "Reviewed", variant: "info", icon: CheckCheck },
};

export function StatusBadge({ 
  status, 
  ...props 
}) {


    const preset = STATUS_PRESETS[status?.toLowerCase()];

    if (!preset) return null;

    return (
        <Badge
            variant={preset.variant}
            icon={preset.icon}
            uppercase
            size="sm"
            {...props}
        >
            {preset.label}
        </Badge>
    );
}

export function RequirementBadge({ 
  required = false, 
  ...props 
}) {

    return (
        <Badge
            variant={required ? "brand" : "default"}
            dot={required}
            uppercase
            size="sm"
            {...props}
        >
            {required ? "Required" : "Optional"}
        </Badge>
    );
}