import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Pagination({ 
    page,
    totalPages,
    setPage
 }) {

    const buttonClass = "inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40";

    return (

        <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-4">

            <button
                type="button"
                disabled={page === 1}
                onClick={ () => setPage((n) => n -1) }
                className={buttonClass}
            >
                <ChevronLeft className="h-4 w-4" />
                Prev
            </button>

            <span className="text-sm text-slate-500">
                Page {page} of {totalPages}
            </span>

            <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((n) => n + 1)}
                className={buttonClass}
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </button>

        </nav>

    );

}