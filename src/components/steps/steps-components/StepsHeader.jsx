export default function StepsHeader({ title, description }) {
    return (
        <header className="flex min-w-0 items-stretch gap-3 sm:gap-4">
            {/* Forest-green accent */}
            <span
                aria-hidden="true"
                className="w-1 shrink-0 rounded-full bg-gradient-to-b from-[#226747] to-[#164e36]"
            />

            <div className="min-w-0 flex-1 py-0.5">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm sm:leading-6">
                        {description}
                    </p>
                )}
            </div>
        </header>
    );
}