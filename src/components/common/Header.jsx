import React from 'react';

export default function Header({ 
  currentStep = 1, 
  totalSteps = 6, 
  user = null, 
  onReset 
}) {
  const stepPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <div>
            <span className="font-bold text-slate-800 text-base tracking-tight leading-tight block">
              Solar Guard
            </span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
              System Sizing & Assessment
            </span>
          </div>
        </div>

        {/* Assessment Progress Status */}
        {totalSteps > 0 && (
          <div className="hidden sm:flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full">
            <div className="text-xs font-semibold text-slate-600">
              Step {currentStep} of {totalSteps}
            </div>
            <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${stepPercentage}%` }}
              />
            </div>
            <span className="text-[11px] font-medium text-emerald-600">
              {stepPercentage}%
            </span>
          </div>
        )}

        {/* User Context & Reset Trigger */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="text-right hidden md:block">
              <p className="text-xs font-semibold text-slate-700">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-[10px] text-slate-400">{user.county || 'Kenya'}</p>
            </div>
          ) : null}

          {onReset && (
            <button
              onClick={onReset}
              className="text-xs text-slate-500 hover:text-rose-600 font-medium px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition border border-transparent hover:border-rose-100"
            >
              Reset Assessment
            </button>
          )}
        </div>
      </div>

      {/* Mobile Step Progress Bar */}
      {totalSteps > 0 && (
        <div className="sm:hidden w-full bg-slate-100 h-1">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${stepPercentage}%` }}
          />
        </div>
      )}
    </header>
  );
}