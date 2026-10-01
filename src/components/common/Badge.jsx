import React from 'react';

export default function Badge({
  children,
  variant = 'default', // 'default' | 'success' | 'warning' | 'danger' | 'info'
  size = 'md', // 'sm' | 'md'
  icon: Icon,
  className = '',
}) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full shrink-0 select-none';

  const variants = {
    default: 'bg-slate-100 text-slate-600 border border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/80',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200/80',
    info: 'bg-sky-50 text-sky-700 border border-sky-200/80',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}