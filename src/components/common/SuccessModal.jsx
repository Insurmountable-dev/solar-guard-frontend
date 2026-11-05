import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

export default function SuccessModal({
  open = false,
  title = 'Success!',
  message,
  buttonLabel = 'Continue',
  onClose,
  autoCloseMs, // optional: e.g. 3000 closes after 3 seconds
  className = '',
}) {

  const buttonRef = useRef(null);

  // Close on Escape, focus the button, and optionally auto-close
  useEffect(() => {

    if (!open) return;

    buttonRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKey);

    const timer = autoCloseMs ? setTimeout(() => onClose?.(), autoCloseMs) : null;

    return () => {
      window.removeEventListener('keydown', handleKey);
      if (timer) clearTimeout(timer);
    };

  }, [open, onClose, autoCloseMs]);

  if (!open) return null;

  return (

    <div
      className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >

      <style>{`
        @keyframes success-pop {
          0%   { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes success-circle {
          0%   { transform: scale(0);   opacity: 0; }
          60%  { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes success-tick {
          0%   { stroke-dashoffset: 30; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes success-tick-bounce {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.15); }
        }
        .success-circle {
          animation: success-circle 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
        }
        .success-check {
          animation: success-tick-bounce 0.3s ease-out 0.85s;
        }
        .success-check path {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: success-tick 0.45s ease-out 0.45s forwards;
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'success-pop 0.25s ease-out' }}
        className={`relative w-full max-w-sm overflow-hidden rounded-3xl bg-white px-6 pb-6 pt-9 text-center shadow-2xl shadow-emerald-900/10 ring-1 ring-emerald-50 ${className}`}
      >

        {/* Accent bar */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300" />

        {/* Animated check */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">

          <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-md" />
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping [animation-iteration-count:2]" />

          <div className="success-circle relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <Check
                className="success-check h-10 w-10 text-white"
                strokeWidth={3}
                aria-hidden="true"
            />
          </div>

        </div>

        {/* Text */}
        <h2 id="success-modal-title" className="mt-5 text-lg font-bold text-slate-800">{title}</h2>

        {message && (
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{message}</p>
        )}

        {/* Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.98]"
        >
          {buttonLabel}
        </button>

      </div>
    </div>

  );
}