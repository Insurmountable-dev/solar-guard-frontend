import React, { useState } from 'react';

// Default 3 Basic Household Items
export const DEFAULT_BASIC_APPLIANCES = [
  { id: 'fridge', name: 'Refrigerator / Freezer', defaultQty: 1, defaultWatts: 150, defaultHours: 24, category: 'Kitchen' },
  { id: 'tv', name: 'TV & Entertainment', defaultQty: 1, defaultWatts: 100, defaultHours: 6, category: 'Living' },
  { id: 'lighting', name: 'LED Lights (4-6 bulbs)', defaultQty: 1, defaultWatts: 50, defaultHours: 5, category: 'Lighting' },
];

// Quick-add presets
export const QUICK_ADD_PRESETS = [
  { id: 'iron', name: 'Iron Box', defaultQty: 1, defaultWatts: 1000, defaultHours: 0.5 },
  { id: 'microwave', name: 'Microwave', defaultQty: 1, defaultWatts: 1200, defaultHours: 0.25 },
  { id: 'water_pump', name: 'Water Pump', defaultQty: 1, defaultWatts: 750, defaultHours: 1 },
  { id: 'instant_shower', name: 'Instant Shower Heater', defaultQty: 1, defaultWatts: 3000, defaultHours: 0.5 },
  { id: 'laptop', name: 'Laptop / WiFi Router', defaultQty: 1, defaultWatts: 60, defaultHours: 10 },
  { id: 'washing_machine', name: 'Washing Machine', defaultQty: 1, defaultWatts: 500, defaultHours: 1 },
];

export default function Step3Appliances({
  formData,
  onChange,
  onApplianceChange,
  onAddAppliance,
  onRemoveAppliance,
}) {
  const [showPresets, setShowPresets] = useState(false);
  const appliances = formData.appliances || DEFAULT_BASIC_APPLIANCES;

  // Calculate total daily energy consumption (kWh/day)
  const totalDailyKWh = appliances.reduce((sum, item) => {
    return sum + (Number(item.defaultQty || 1) * Number(item.defaultWatts || 0) * Number(item.defaultHours || 0)) / 1000;
  }, 0).toFixed(2);

  // Quick add preset handler
  const handleAddPreset = (preset) => {
    onAddAppliance({
      ...preset,
      id: `${preset.id}_${Date.now()}`,
    });
    setShowPresets(false);
  };

  // Custom blank item handler
  const handleAddCustom = () => {
    onAddAppliance({
      id: `custom_${Date.now()}`,
      name: 'Custom Appliance',
      defaultQty: 1,
      defaultWatts: 100,
      defaultHours: 2,
    });
    setShowPresets(false);
  };

  return (
    <div className="space-y-6 w-full max-w-xl mx-auto">
      {/* Header Banner */}
      <div className="space-y-1">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          Appliance Energy Profile
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          We start with 3 basic household items. Adjust quantities or add items to calculate your daily energy target.
        </p>
      </div>

      {/* Live Energy Consumption Summary Badge */}
      <div className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
            Estimated Daily Consumption
          </p>
          <p className="text-lg font-black text-emerald-950 mt-0.5">
            {totalDailyKWh} <span className="text-xs font-semibold">kWh / day</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-emerald-700 font-medium">Estimated Monthly Usage</p>
          <p className="text-xs font-bold text-emerald-900 mt-0.5">
            ~{Math.round(totalDailyKWh * 30)} kWh / month
          </p>
        </div>
      </div>

      {/* Monthly Bill Input (Optional fallback) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <label className="block text-xs font-semibold text-slate-700">
          Average Monthly KPLC Bill (KES)
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-slate-400 font-semibold pointer-events-none">
            KES
          </span>
          <input
            type="number"
            name="monthly_bill_kes"
            placeholder="e.g. 4500"
            value={formData.monthly_bill_kes || ''}
            onChange={onChange}
            className="w-full pl-12 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Basic & Added Appliances List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Household Appliances ({appliances.length})
          </h3>
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-2xs cursor-pointer flex items-center gap-1"
          >
            + Add Appliance
          </button>
        </div>

        {/* Quick Add Presets Modal / Dropdown Box */}
        {showPresets && (
          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <p className="text-xs font-bold text-slate-200">Select Common Preset or Custom</p>
              <button
                type="button"
                onClick={() => setShowPresets(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {QUICK_ADD_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleAddPreset(preset)}
                  className="p-2 text-left bg-slate-800 hover:bg-emerald-900/60 border border-slate-700/80 rounded-xl transition cursor-pointer"
                >
                  <p className="text-xs font-semibold text-white truncate">{preset.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{preset.defaultWatts}W • {preset.defaultHours}h/day</p>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddCustom}
              className="w-full py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition cursor-pointer text-center"
            >
              + Add Custom Blank Appliance
            </button>
          </div>
        )}

        {/* Appliance Cards */}
        <div className="space-y-2.5">
          {appliances.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onApplianceChange(index, 'name', e.target.value)}
                  className="text-xs font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-hidden px-1 py-0.5 rounded-xs w-full"
                />
                <button
                  type="button"
                  onClick={() => onRemoveAppliance(index)}
                  className="text-slate-400 hover:text-rose-500 text-xs font-bold px-2 py-1 cursor-pointer transition shrink-0"
                  title="Remove Item"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-medium text-slate-500 mb-1">
                    Qty
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.defaultQty}
                    onChange={(e) => onApplianceChange(index, 'defaultQty', Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-center focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-slate-500 mb-1">
                    Power (Watts)
                  </label>
                  <input
                    type="number"
                    step="10"
                    value={item.defaultWatts}
                    onChange={(e) => onApplianceChange(index, 'defaultWatts', Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-center focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-slate-500 mb-1">
                    Hours / Day
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    max="24"
                    value={item.defaultHours}
                    onChange={(e) => onApplianceChange(index, 'defaultHours', Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-center focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}