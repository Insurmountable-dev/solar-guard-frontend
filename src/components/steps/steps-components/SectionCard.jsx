import { StatusBadge, RequirementBadge } from "../../common/Badge";

export default function SectionCard({
     icon: Icon,
     title,
     description, 
     required = false,
     status,
     action,
     navigate, 
     children, 
     className = ''
    }) {


    return (

        <div 
            onClick={navigate}
            className={`min-w-0  overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md`}
        >

            {/* Subtle forest-green accent */}
            <div aria-hidden="true" className="h-1 w-full bg-gradient-to-r from-[#164e36] via-[#226747] to-[#347858]"/>

            {/* Section header */}
            <div className="flex min-w-0 items-center gap-3 border-b border-slate-100 bg-[#f8faf9] px-4 py-3.5 sm:px-5">

              {(Icon || action) && (

                <div className="flex shrink-0 items-center gap-2">
                    {Icon && (
                        <span
                            aria-hidden="true"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#164e36] text-white shadow-sm sm:h-10 sm:w-10"
                        >
                            <Icon size={18} strokeWidth={2} />
                        </span>
                    )}

                    {action && (
                        <div className="shrink-0">
                            {action}
                        </div>
                    )}
                </div>

              )}
                

                <div className="min-w-0 flex-1">

                    <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">{title}</h3>

                    {description && (
                        <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{description}</p>
                    )}
                </div>

               <div className="flex shrink-0 items-center gap-1.5">
                      <StatusBadge status={status} />                      
                      {required && <RequirementBadge required={required} />}
                </div>

            </div>

            {/* Section content */}
            <div className={`min-w-0 p-4 sm:p-5 ${className}`}>
                {children}
            </div>
        </div>
    );
}
