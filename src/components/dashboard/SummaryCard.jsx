import React from "react";

export default function SummaryCard({
    title,
    value,
    description,
    icon: Icon
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        {description}
                    </p>
                </div>

                {Icon && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                        <Icon className="h-5 w-5 text-emerald-600" />
                    </div>
                )}
            </div>
        </div>
    );
}