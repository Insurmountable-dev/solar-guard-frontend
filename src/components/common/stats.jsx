export function DateStat({ icon: Icon, label, value }) {

    return (
        <div className="flex items-center gap-3 px-1 py-1 sm:px-4 sm:first:pl-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Icon size={17} aria-hidden="true" />
            </span>
            <div className="min-w-0">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="truncate text-sm font-semibold text-gray-900">
                    {value}
                </p>
            </div>
        </div>
    );
    
}