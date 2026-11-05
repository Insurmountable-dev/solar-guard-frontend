import { Calculator } from "lucide-react";
import { calculateArea } from "../../../utils/calculateArea";


function Chip({ value, unit, caption, className }) {

  return (

    <div className="flex flex-col items-center gap-1">

      <span className={`rounded-lg px-3 py-1.5 text-sm font-semibold tabular-nums ${className}`}>{value} {unit}</span>
      <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400"> {caption}</span>

    </div>

  );

}
 
function Operator({ children }) {
  return (
    <span className="pb-4 text-lg font-light text-gray-400">{children}</span>
  );
}
 
export default function AreaDisplay({ 
  label, 
  length, 
  width, 
  unit = "m" 
}) {

  const result = calculateArea(length, width);
 
  if (!result) {
    return (

      <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50/60 p-4">
        <div className="rounded-lg bg-gray-100 p-2 text-gray-400"><Calculator size={18} /> </div>

        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-xs text-gray-400">
            Enter a length and width to calculate the area.
          </p>
        </div>

      </div>

    );
  }
 
  return (

    <div className="overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
            <Calculator size={18} />
          </div>
          <span className="text-sm font-semibold text-gray-700">{label}</span>
        </div>
 
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
          Auto-calculated
        </span>
      </div>
 
      {/* Result */}
      <div className="px-5 pt-3">
        <p className="text-4xl font-bold tracking-tight text-emerald-700">
          {result.area}
          <span className="ml-1.5 text-lg font-medium text-emerald-500">
            {unit}²
          </span>
        </p>
      </div>
 
      {/* Formula */}
      <div className="mt-4 border-t border-emerald-100 bg-white/70 px-5 py-4">
        <div className="mb-3 flex items-center gap-2">
        
          <span className="text-xs text-gray-400">Area = Length × Width</span>
          <span className="rounded-md border border-dashed border-emerald-300 bg-emerald-50 px-2 py-0.5 font-mono text-xs text-emerald-700">
            A = l × w
          </span>
        </div>
 
        <div className="flex flex-wrap items-center gap-2">
          <Chip
            value={result.length}
            unit={unit}
            caption="length"
            className="bg-sky-100 text-sky-700"
          />
          <Operator>×</Operator>
          <Chip
            value={result.width}
            unit={unit}
            caption="width"
            className="bg-amber-100 text-amber-700"
          />
          <Operator>=</Operator>
          <Chip
            value={result.area}
            unit={`${unit}²`}
            caption="area"
            className="bg-emerald-600 text-white shadow-sm"
          />
        </div>
      </div>

    </div>

  );
}
 