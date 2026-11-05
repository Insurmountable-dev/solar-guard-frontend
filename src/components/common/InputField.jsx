import { forwardRef } from 'react';
import { Info } from "lucide-react";


const getLabel = (opt) => opt?.label ?? opt?.title ?? opt;
const getValue = (opt) => opt?.value ?? opt;

const InputField = forwardRef(function InputField({
    id,
    list,
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    helperText,
    required = false,
    options = [], // [{ value, label | title, description, badge }]
    icon: Icon,
    className = '',
    disabled = false,
    min, // only applied for type="number"
    showDescription = true, // set false to hide the description card
    ...props
  },
  ref
) {


  const fieldId = id ?? name;

  // Find the option the user picked (works for select and datalist inputs)

  
  const selectedOption =  (showDescription && (type === 'select' || list)) ? options.find((opt) => getValue(opt) === value)  : null;

  const description = selectedOption?.description;

  const describedBy = [

      description &&`${fieldId}-description`,
      error ? `${fieldId}-error` : helperText ? `${fieldId}-help` : null,

  ].filter(Boolean).join(' ') || undefined;

  const fieldClasses = [

    'w-full bg-white border text-sm rounded-xl py-2.5 text-slate-800',
    'focus:outline-none focus:ring-2 transition',
    'disabled:bg-slate-50 disabled:text-slate-400',

    Icon ? 'pl-10 pr-3.5' : 'px-3.5',

    error
      ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400'
      : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500',

    type !== 'select' ? 'placeholder-slate-400' : '',

  ].join(' ');

  const commonProps = {
    id: fieldId,
    name,
    value,
    onChange,
    disabled,
    required,
    'aria-invalid': !!error,
    'aria-describedby': describedBy,
    className: fieldClasses,
    ref,
  };

  return (

    <div className={`flex flex-col gap-1.5 w-full ${className}`}>

      {label && (

        <label htmlFor={fieldId} className="text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>

      )}

      <div className="relative flex items-center">

        {Icon && (

          <div className="absolute left-3.5 pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>

        )}

        {type === 'select' ? (

          <select {...commonProps} {...props}>

            <option value="" disabled>{placeholder || 'Select an option...'}</option>

            {options.map((opt) => (

              <option key={getValue(opt)} value={getValue(opt)}>
                {getLabel(opt)}
              </option>

            ))}

          </select>

        ) : (

          <>

            <input
              {...commonProps}
              type={type}
              placeholder={placeholder}
              min={type === 'number' ? (min ?? 0) : undefined}
              list={list || undefined}
              {...props}
            />

            {list && (

              <datalist id={list}>

                {options.map((opt) => (
                  <option
                    key={getValue(opt)}
                    value={getValue(opt)}
                    label={typeof opt === 'object' ? getLabel(opt) : undefined}
                  />
                ))}

              </datalist>

            )}
          </>
        )}

      </div>

      {/* Description card: sits between the field and the helper/error text */}

      {description && (


        <div
            id={`${fieldId}-description`}
            aria-live="polite"
            className="flex gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3.5 py-3"
        >
            <Info
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                aria-hidden="true"
            />

            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold text-emerald-800">
                        {getLabel(selectedOption)}
                    </p>

                    {selectedOption.badge && (
                        <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            {selectedOption.badge}
                        </span>
                    )}
                </div>

                <p className="mt-0.5 text-xs leading-relaxed text-emerald-700/90">
                    {description}
                </p>
            </div>
        </div>

      )}


      {error ? (
        <p id={`${fieldId}-error`} role="alert" className="text-xs text-rose-500 font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${fieldId}-help`} className="text-xs text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default InputField;