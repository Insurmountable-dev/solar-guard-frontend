
export default function ApplianceField({ label, icon: Icon, children}) {

    return (
        <div className="min-w-0">
            <label className={labelClass}>
                <span className="inline-flex items-center gap-1.5">
                    {Icon && (
                        <Icon  size={14}  className="text-[#226747]"  aria-hidden="true"/>
                    )}
                    {label}
                </span>
            </label>

            {children}
        </div>

    );
}