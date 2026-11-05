import { useEffect, useRef, useState } from 'react';

const FADE_MS = 300;

export default function LoadingSpinner({
    size = 'md',
    label,
    messages = [],
    interval = 2500,
    loop = true,
    showProgress = true,
    fullPage = false,
    autoClose = false,
    closeDelay = FADE_MS,
    onComplete,
    onClose,
    className = '',
}) {
  
    const inlineSizes = {
        sm: {
            box: 'w-8 h-8',
            border: 'border-[3px]',
            dot: 'w-2 h-2',
            orbit: 'w-1 h-1',
            text: 'text-xs'
        },
        md: {
            box: 'w-16 h-16',
            border: 'border-4',
            dot: 'w-3.5 h-3.5',
            orbit: 'w-1.5 h-1.5',
            text: 'text-sm'
        },
        lg: {
            box: 'w-24 h-24',
            border: 'border-[6px]',
            dot: 'w-5 h-5',
            orbit: 'w-2 h-2',
            text: 'text-base'
        },
    };

    const fullPageSizes = {
        sm: {
            box: 'w-24 h-24',
            border: 'border-[5px]',
            dot: 'w-3.5 h-3.5',
            orbit: 'w-2 h-2',
            text: 'text-sm'
        },
        md: {
            box: 'w-32 h-32 sm:w-40 sm:h-40',
            border: 'border-[7px]',
            dot: 'w-5 h-5',
            orbit: 'w-2.5 h-2.5',
            text: 'text-base'
        },
        lg: {
            box: 'w-40 h-40 sm:w-56 sm:h-56',
            border: 'border-[10px]',
            dot: 'w-7 h-7',
            orbit: 'w-3 h-3',
            text: 'text-lg'
        },
    };

    const sizes = (fullPage ? fullPageSizes : inlineSizes)[size] ?? inlineSizes.md;

    const safeMessages = Array.isArray(messages) ? messages.filter(Boolean) : [];
    const messagesKey = safeMessages.join('|');
    const count = safeMessages.length;

    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [closing, setClosing] = useState(false);
    const [closed, setClosed] = useState(false);

    const onCompleteRef = useRef(onComplete);
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCompleteRef.current = onComplete;
        onCloseRef.current = onClose;
    }, [onComplete, onClose]);

    // =========================================================
    // FULL PAGE INTERACTION LOCK
    // =========================================================

    useEffect(() => {
        if (!fullPage) return;

        const body = document.body;
        const html = document.documentElement;

        // Save original document styles
        const originalBodyOverflow = body.style.overflow;
        const originalHtmlOverflow = html.style.overflow;
        const originalBodyOverscroll = body.style.overscrollBehavior;
        const originalHtmlOverscroll = html.style.overscrollBehavior;

        // Disable scrolling
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        body.style.overscrollBehavior = 'none';
        html.style.overscrollBehavior = 'none';

        // Prevent scroll events
        const preventScroll = (event) => {
            event.preventDefault();
        };

        // Prevent keyboard interaction
        const preventKeyboard = (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        };

        // Remove focus from previously focused inputs/buttons
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        // Block mouse wheel scrolling
        window.addEventListener('wheel', preventScroll, { passive: false, capture: true });

        // Block touch scrolling
        window.addEventListener('touchmove', preventScroll, { passive: false, capture: true });

        // Block keyboard interaction
        window.addEventListener('keydown', preventKeyboard, true);
        window.addEventListener('keypress', preventKeyboard, true);

        // Block context menus
        window.addEventListener('contextmenu', preventScroll, true);

        // Restore everything when loading finishes
        return () => {
            body.style.overflow = originalBodyOverflow;
            html.style.overflow = originalHtmlOverflow;
            body.style.overscrollBehavior = originalBodyOverscroll;
            html.style.overscrollBehavior = originalHtmlOverscroll;

            window.removeEventListener('wheel', preventScroll, true);
            window.removeEventListener('touchmove', preventScroll, true);
            window.removeEventListener('keydown', preventKeyboard, true);
            window.removeEventListener('keypress', preventKeyboard, true);
            window.removeEventListener('contextmenu', preventScroll, true);
        };
    }, [fullPage]);

    // =========================================================
    // MESSAGE ANIMATION
    // =========================================================

    const hasCompletion = autoClose || typeof onComplete === 'function';

    useEffect(() => {
        setIndex(0);
        setVisible(true);
        setClosing(false);
        setClosed(false);

        if (count === 0) return;
        if (count === 1 && !hasCompletion) return;

        const safeInterval = Math.max(interval, FADE_MS * 2);
        const timers = [];
        let step = 0;

        const finish = () => {
            onCompleteRef.current?.();

            if (autoClose) {
                try {
                    onCloseRef.current?.();
                } finally {
                    setClosing(true);
                    timers.push(
                        setTimeout(() => {
                            setClosed(true);
                        }, closeDelay)
                    );
                }
            }
        };

        const schedule = () => {
            timers.push(
                setTimeout(() => {
                    const isLast = step >= count - 1;

                    if (isLast && hasCompletion) {
                        finish();
                        return;
                    }

                    if (isLast && !loop) return;

                    setVisible(false);

                    timers.push(
                        setTimeout(() => {
                            step = isLast ? 0 : step + 1;
                            setIndex(step);
                            setVisible(true);
                            schedule();
                        }, FADE_MS)
                    );
                }, safeInterval)
            );
        };

        schedule();

        return () => timers.forEach(clearTimeout);
    }, [
        messagesKey,
        count,
        interval,
        loop,
        autoClose,
        closeDelay,
        hasCompletion
    ]);

    if (closed) return null;

    const progress = count > 0 ? ((index + 1) / count) * 100 : 0;

    const fadeClass = `transition-opacity ease-out ${closing ? 'opacity-0' : 'opacity-100'}`;

    const fadeStyle = {
        transitionDuration: `${closeDelay}ms`
    };

    // =========================================================
    // SPINNER CONTENT
    // =========================================================

    const spinnerContent = (
        <div
            className={`
                flex flex-col items-center justify-center
                ${fullPage ? 'gap-8' : 'gap-5'}
                ${fullPage ? '' : fadeClass}
                ${className}
            `}
            style={fullPage ? undefined : fadeStyle}
        >
            {/* Spinner Animation */}

            <div
                className={`relative flex items-center justify-center ${sizes.box}`}
                role="status"
                aria-label="Loading"
            >
                {/* Soft Glow */}

                <div className="absolute -inset-3 rounded-full bg-emerald-400/25 blur-xl motion-safe:animate-pulse" />

                {/* Expanding Ripple */}

                <div className="absolute inset-0 rounded-full bg-emerald-400/20 motion-safe:animate-ping" />

                {/* Outer Orbit */}

                <div className="absolute -inset-2 rounded-full border border-dashed border-emerald-300/70 motion-safe:animate-spin [animation-direction:reverse] [animation-duration:8s]" />

                {/* Faint Track */}

                <div className={`absolute inset-0 rounded-full border-emerald-100 ${sizes.border}`} />

                {/* Spinning Arc */}

                <div className={`absolute inset-0 rounded-full border-emerald-600 border-t-transparent border-r-emerald-400 shadow-sm motion-safe:animate-spin ${sizes.border}`} />

                {/* Orbiting Satellite */}

                <div
                    className="absolute -inset-2 motion-safe:animate-spin [animation-duration:2.4s]"
                    aria-hidden="true"
                >
                    <span className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)] ${sizes.orbit}`} />
                </div>

                {/* Center Dot */}

                <div className={`rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_14px_rgba(16,185,129,0.7)] motion-safe:animate-pulse ${sizes.dot}`} />
            </div>

            {/* Loading Messages */}

            {(label || count > 0) && (
                <div className="flex w-64 max-w-full flex-col items-center gap-2.5 text-center sm:w-72">
                    {/* Main Label */}

                    {label && (
                        <div className="flex items-center gap-1.5">
                            <p className={`${sizes.text} font-semibold text-slate-700 motion-safe:animate-pulse`}>
                                {label}
                            </p>

                            {count === 0 && (
                                <span className="flex items-end gap-0.5 pb-0.5" aria-hidden="true">
                                    <span className="h-1 w-1 rounded-full bg-emerald-500 motion-safe:animate-bounce [animation-delay:-0.3s]" />
                                    <span className="h-1 w-1 rounded-full bg-emerald-500 motion-safe:animate-bounce [animation-delay:-0.15s]" />
                                    <span className="h-1 w-1 rounded-full bg-emerald-500 motion-safe:animate-bounce" />
                                </span>
                            )}
                        </div>
                    )}

                    {/* Rotating Messages */}

                    {count > 0 && (
                        <>
                            <div
                                className="flex min-h-[1.75rem] items-center justify-center gap-2"
                                role="status"
                                aria-live="polite"
                            >
                                <p className={`${sizes.text} font-medium text-slate-600 transition-all duration-300 ease-out ${visible ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`}>
                                    {safeMessages[index]}
                                </p>

                                <span className="flex shrink-0 items-end gap-0.5 pb-0.5" aria-hidden="true">
                                    <span className="h-1 w-1 rounded-full bg-emerald-500 motion-safe:animate-bounce [animation-delay:-0.3s]" />
                                    <span className="h-1 w-1 rounded-full bg-emerald-500 motion-safe:animate-bounce [animation-delay:-0.15s]" />
                                    <span className="h-1 w-1 rounded-full bg-emerald-500 motion-safe:animate-bounce" />
                                </span>
                            </div>

                            {/* Progress Bar */}

                            {showProgress && count > 1 && (
                                <div className="flex w-full items-center gap-3" aria-hidden="true">
                                    <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-emerald-100">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-teal-500 transition-all duration-700 ease-out"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>

                                    <span className="font-mono text-[10px] font-bold tabular-nums tracking-widest text-slate-400">
                                        {String(index + 1).padStart(2, '0')}/{String(count).padStart(2, '0')}
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );

    // =========================================================
    // FULL PAGE LOADING OVERLAY
    // =========================================================

    if (fullPage) {
        return (
            <div
                className={`fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-white/60 p-4 backdrop-blur-md ${fadeClass}`}
                style={{
                    ...fadeStyle,
                    touchAction: 'none',
                    overscrollBehavior: 'none',
                }}
                onWheel={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
                onScroll={(e) => e.preventDefault()}
                role="alert"
                aria-busy="true"
                aria-label="Page loading"
            >
                {/* Background Texture */}

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(16,185,129,0.25) 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 65%)',
                        maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 65%)',
                    }}
                />

                {/* Soft Emerald Light */}

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/20 blur-3xl"
                />

                {/* Spinner */}

                <div className="relative pointer-events-none">
                    {spinnerContent}
                </div>
            </div>
        );
    }

    // =========================================================
    // INLINE LOADING SPINNER
    // =========================================================

    return spinnerContent;
}