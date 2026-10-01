import React from 'react';

export default function CardSelect({
  options = [], // Array of { value, title, description, badge, icon: Component }
  value,
  onChange,
  gridCols = 'grid-cols-1 sm:grid-cols-2',
  className = '',
}) {
  return (
    <div className={`grid ${gridCols} gap-3.5 w-full ${className}`}>
      {options.map((opt) => {
        const isSelected = value === opt.value;
        const Icon = opt.icon;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative flex items-start gap-3.5 p-4 text-left rounded-xl border transition-all duration-150 cursor-pointer select-none ${
              isSelected
                ? 'bg-emerald-50/60 border-emerald-500 ring-2 ring-emerald-500/20 text-slate-800'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-700'
            }`}
          >
            {/* Selection Check Indicator */}
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition ${
                isSelected
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {isSelected && (
                <svg
                  className="w-2.5 h-2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <div className="flex items-center gap-2">
                  {Icon && (
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    />
                  )}
                  <span className="text-xs font-semibold tracking-tight text-slate-800">
                    {opt.title}
                  </span>
                </div>
                {opt.badge && (
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {opt.badge}
                  </span>
                )}
              </div>

              {opt.description && (
                <p className="text-xs text-slate-500 leading-snug">{opt.description}</p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}