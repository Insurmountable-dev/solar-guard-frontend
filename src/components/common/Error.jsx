import { useId, useState } from "react";
import { AlertTriangle, ChevronDown, Loader2, RotateCw, WifiOff } from "lucide-react";
import Sleep from "../../utils/Sleep";

/* Full class names only, so Tailwind can detect them. */
const TONES = {
    error: {
        banner: "border-rose-200 bg-rose-50 text-rose-900",
        iconWrap: "bg-rose-100 text-rose-600",
        body: "text-rose-800/90",
        button:
            "bg-rose-600 text-white shadow-rose-900/20 hover:bg-rose-700 focus-visible:ring-rose-500",
        link: "text-rose-700 hover:text-rose-900",
        sun: "fill-rose-300",
        sunGlow: "fill-rose-300/25",
        cloud: "fill-white stroke-rose-200",
    },
    warning: {
        banner: "border-amber-200 bg-amber-50 text-amber-900",
        iconWrap: "bg-amber-100 text-amber-600",
        body: "text-amber-800/90",
        button:
            "bg-amber-500 text-white shadow-amber-900/20 hover:bg-amber-600 focus-visible:ring-amber-500",
        link: "text-amber-700 hover:text-amber-900",
        sun: "fill-amber-300",
        sunGlow: "fill-amber-300/25",
        cloud: "fill-white stroke-amber-200",
    },
};

/* The sun from the assessment screens, half hidden behind a cloud. */
function CloudySun({ tone }) {
    return (
        <svg
            viewBox="0 0 120 84"
            className="h-20 w-28"
            aria-hidden="true"
            focusable="false"
        >
            <circle cx="78" cy="30" r="26" className={tone.sunGlow} />
            <circle cx="78" cy="30" r="15" className={tone.sun} />

            <path
                d="M30 70 a15 15 0 0 1 1.5-29.9 A21 21 0 0 1 72 44 a13 13 0 0 1 1 26 Z"
                className={tone.cloud}
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function RetryButton({ onRetry, isRetrying, label, tone, className = "" }) {
    return (
        <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${tone.button} ${className}`}
        >
            {isRetrying ? (
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            ) : (
                <RotateCw size={16} aria-hidden="true" />
            )}
            {isRetrying ? "Trying again" : label}
        </button>
    );
}

function TechnicalDetails({ error, tone }) {
    const [open, setOpen] = useState(false);
    const id = useId();

    const text =
        typeof error === "string"
            ? error
            : error?.message || error?.toString?.() || "";

    if (!text) return null;

    return (
        <div className="mt-3">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={id}
                className={`inline-flex items-center gap-1 text-xs font-medium focus:outline-none focus-visible:underline ${tone.link}`}
            >
                <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
                {open ? "Hide details" : "Show details"}
            </button>

            {open && (
                <pre
                    id={id}
                    className="mt-2 max-h-32 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-black/5 p-3 text-left text-xs leading-5 text-slate-700"
                >
                    {text}
                </pre>
            )}
        </div>
    );
}

/**
 * Reusable error display.
 *
 * variant:  "banner" (inline strip, default) | "card" (centered, fills a section) | "page" (full-screen)
 * tone:     "error" | "warning"
 * offline:  swaps the default icon and copy for a connection problem
 * onRetry:  shows a retry button; pair with isRetrying for a spinner
 * error:    an Error or string, shown behind a "Show details" toggle
 * action:   any extra node, e.g. a "Contact support" link
 */

export default function Error({
    title,
    message,
    variant = "banner",
    tone: toneName = "error",
    offline = false,
    icon: Icon,
    onRetry,
    retryLabel = "Try again",
    error,
    action,
    className = "",
}) {

    const [isRetrying, setIsRetrying] = useState(false);

    const tone = TONES[toneName] ?? TONES.error;
    const ResolvedIcon = Icon ?? (offline ? WifiOff : AlertTriangle);

    const heading =
        title ??
        (offline ? "You appear to be offline" : "Something went wrong");
    const body =
        message ??
        (offline
            ? "Check your internet connection and try again."
            : "We couldn't load this. Try again in a moment.");

    /* Inline strip: for forms, lists and small sections */
    if (variant === "banner") {
        return (
            <div
                role="alert"
                className={`flex items-start gap-3 rounded-xl border p-4 ${tone.banner} ${className}`}
            >
                <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone.iconWrap}`}
                >
                    <ResolvedIcon size={18} aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{heading}</p>
                    <p className={`mt-0.5 text-sm leading-5 ${tone.body}`}>{body}</p>

                    <TechnicalDetails error={error} tone={tone} />

                    {(onRetry || action) && (
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            {onRetry && (
                                <RetryButton
                                    onRetry={onRetry}
                                    isRetrying={isRetrying}
                                    label={retryLabel}
                                    tone={tone}
                                    className="px-3.5 py-2"
                                />
                            )}
                            {action}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    /* Centered: for a card or a whole page body */
    const isPage = variant === "page";

    return (
        <div
            role="alert"
            className={`mx-auto flex w-full max-w-md flex-col items-center text-center ${
                isPage ? "min-h-[60vh] justify-center px-6 py-16" : "px-5 py-10"
            } ${className}`}
        >
            {offline || Icon ? (
                <span
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${tone.iconWrap}`}
                >
                    <ResolvedIcon size={28} aria-hidden="true" />
                </span>
            ) : (
                <CloudySun tone={tone} />
            )}

            <h2
                className={`mt-5 font-semibold tracking-tight text-slate-900 ${
                    isPage ? "text-2xl" : "text-lg"
                }`}
            >
                {heading}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>

            {(onRetry || action) && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {onRetry && (
                        <RetryButton
                            onRetry={async() => {
                                onRetry();

                                setIsRetrying(true);
                                await Sleep(1500);
                                setIsRetrying(false);

                                return;
                            }}
                            isRetrying={isRetrying}
                            label={retryLabel}
                            tone={tone}
                            className="px-5"
                        />
                    )}
                    {action}
                </div>
            )}

            <TechnicalDetails error={error} tone={tone} />
        </div>
    );
}