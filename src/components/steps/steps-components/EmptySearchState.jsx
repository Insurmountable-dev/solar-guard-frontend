import { SearchX, RotateCcw } from 'lucide-react';
import Button from '../../common/Button';

export default function EmptySearchState({
  icon: Icon = SearchX,
  title = 'No appliances found',
  message = 'Nothing matches that search. Try a shorter word, check the spelling.',
  actionLabel = 'Clear search',
  onAction,
  suggestions = [], // e.g. ['Fridge', 'Pasi', 'Posho mill']
  suggestionsLabel = 'Popular searches',
  loadingLabel = 'Clearing search....',
  onSuggestionClick,
  isLoading,
  className = '',
}) {
  return (

    <div className={`relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>

      {/* ───────── Hero: radar scanner ───────── */}
      <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 px-6 py-10 sm:py-12">

        {/* decorative grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:20px_20px]"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />

        {/* decorative glows */}
        <span aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-emerald-300/30 blur-3xl" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-teal-300/20 blur-3xl" />

        {/* radar */}
        <div aria-hidden="true" className="relative h-44 w-44 sm:h-52 sm:w-52">

          {/* rings */}
          <span className="absolute inset-0 rounded-full border border-white/25" />
          <span className="absolute inset-6 rounded-full border border-white/20" />
          <span className="absolute inset-12 rounded-full border border-white/15" />

          {/* crosshair */}
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/15" />
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/15" />

          {/* sweep */}
          <span
            className="absolute inset-0 rounded-full motion-safe:animate-spin [animation-duration:4s]"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(255,255,255,0.45) 360deg)',
            }}
          />

          {/* blips */}
          <span className="absolute left-[22%] top-[28%] h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-white/80 motion-safe:animate-ping [animation-duration:2.5s]" />
            <span className="absolute inset-0 rounded-full bg-white/70" />
          </span>
          <span className="absolute bottom-[24%] right-[20%] h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-white/80 motion-safe:animate-ping [animation-duration:3.2s]" />
            <span className="absolute inset-0 rounded-full bg-white/60" />
          </span>

          {/* center badge */}
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] ring-4 ring-white/25">
            <Icon className="h-8 w-8" strokeWidth={2.25} />
          </span>

        </div>

        {/* corner ticks */}
        <span aria-hidden="true" className="absolute left-3 top-3 h-2.5 w-2.5 border-l-2 border-t-2 border-white/50" />
        <span aria-hidden="true" className="absolute right-3 top-3 h-2.5 w-2.5 border-r-2 border-t-2 border-white/50" />
        <span aria-hidden="true" className="absolute bottom-3 left-3 h-2.5 w-2.5 border-b-2 border-l-2 border-white/50" />
        <span aria-hidden="true" className="absolute bottom-3 right-3 h-2.5 w-2.5 border-b-2 border-r-2 border-white/50" />

      </div>

      {/* ───────── Content ───────── */}
      <div className="relative flex flex-col items-center px-6 pb-10 pt-8 text-center sm:pb-12">

        <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">{title}</h2>

        {message && (
          <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-slate-500">{message}</p>
        )}

        {onAction && (

          <Button variant="primary" isLoading={isLoading} size="md" icon={RotateCcw} onClick={onAction} className="mt-6">
            {isLoading ? loadingLabel : actionLabel}
          </Button>

        )}

        {suggestions.length > 0 && (
          <div className="mt-9 flex w-full max-w-md flex-col items-center gap-3">

            <div className="flex w-full items-center gap-3">
              <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {suggestionsLabel}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200" />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onSuggestionClick?.(s)}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-[0_8px_18px_-10px_rgba(16,185,129,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <span aria-hidden="true" className="font-mono text-emerald-500 transition-transform duration-200 group-hover:translate-x-0.5">›</span>
                  {s}
                </button>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>

  );
}