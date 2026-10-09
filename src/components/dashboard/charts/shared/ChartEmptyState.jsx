
export default function ChartEmptyState({icon: Icon, iconClass, softClass, title, message,heightClass = "h-72"}) {

    return (

        <div className={`flex ${heightClass} flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 text-center`}>

            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${softClass}`}>
                <Icon size={22} className={iconClass} />
            </div>

            <p className="text-sm font-medium text-slate-700">{title}</p>


            <p className="max-w-xs text-xs text-slate-500">{message}</p>

        </div>

    );

}
