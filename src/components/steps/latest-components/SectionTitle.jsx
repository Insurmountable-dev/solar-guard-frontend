

export default function SectionTitle({ title, description }) {

    return (

        <div className="mb-4">

            <h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2>

            {description && (
                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">{description}</p>
            )}

        </div>
    );

}
