import React from 'react';

export default function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  options = [], // Used if type === 'select'
  icon: Icon,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="text-xs font-semibold text-slate-700 flex items-center justify-between">
          <span>
            {label} {required && <span className="text-rose-500">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full bg-white border text-sm rounded-xl py-2.5 px-3.5 ${
              Icon ? 'pl-10' : ''
            } ${
              error
                ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400'
                : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'
            } text-slate-800 focus:outline-none focus:ring-2 transition disabled:bg-slate-50 disabled:text-slate-400`}
            {...props}
          >
            <option value="" disabled>
              {placeholder || 'Select an option...'}
            </option>
            {options.map((opt) => (
              <option key={opt.value ?? opt} value={opt.value ?? opt}>
                {opt.label ?? opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full bg-white border text-sm rounded-xl py-2.5 px-3.5 ${
              Icon ? 'pl-10' : ''
            } ${
              error
                ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400'
                : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'
            } text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition disabled:bg-slate-50 disabled:text-slate-400`}
            {...props}
          />
        )}
      </div>

      {error ? (
        <p className="text-xs text-rose-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
}