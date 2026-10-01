import React from 'react';

export default function LoadingSpinner({
  size = 'md', // 'sm' | 'md' | 'lg'
  label,
  fullPage = false,
  className = '',
}) {
  const spinnerSizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };

  const spinnerContent = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`${spinnerSizes[size]} border-emerald-600 border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {label && <p className="text-xs font-medium text-slate-500 animate-pulse">{label}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center min-w-[200px]">
          {spinnerContent}
        </div>
      </div>
    );
  }

  return spinnerContent;
}