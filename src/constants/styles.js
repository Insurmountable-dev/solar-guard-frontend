export const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

export const variants = {
    primary:'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500 shadow-emerald-500/10',
    secondary:'bg-slate-800 hover:bg-slate-900 text-white shadow-sm focus:ring-slate-700',
    outline:'border border-slate-300 hover:bg-slate-50 text-slate-700 focus:ring-emerald-500 bg-white',
    danger:'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500',
};

export const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
};

// Mostly recent assesments
export const statusStyles = {
    draft:"bg-yellow-100 text-yellow-700",
    reviewed:"bg-blue-100 text-blue-700",
    completed:"bg-green-100 text-green-700",
};


// draft: "bg-gray-100 text-gray-700",
// waiting: "bg-yellow-100 text-yellow-700",
