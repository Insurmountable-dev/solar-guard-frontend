
export default function Metric({label,value}) {
    return (

        <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
        </div>

    );
};