import React, { useState } from 'react';

// Hardcoded mock dataset representing a typical Kenyan household PV sizing output
const FIXED_PROPOSAL = {
  location: 'Westlands, Nairobi County',
  systemCapacityKW: 3.85,
  totalPanels: 7,
  panelWattage: 550,
  requiredBatteryKWh: 9.6,
  inverterRatingKW: 5.0,
  batteryTypeLabel: 'Lithium Iron Phosphate (LiFePO4)',
  systemTypeLabel: 'Hybrid Pure Sine Wave System',
  dailyKWh: 12.4,
  monthlyKWhGenerated: 480,
  monthlySavingsKES: 14400,
  totalEstimatedCostKES: 485000,
  paybackYears: '3.4',
};

export default function Step6SummaryResultFixed({ onSubmit, isSubmitting }) {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {/* Header Banner */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Engineered System Proposal
          </span>
          <span className="text-xs text-slate-400">• Ready for Assessment</span>
        </div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Solar System Sizing Summary
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Proposal generated for <span className="font-semibold text-slate-700">{FIXED_PROPOSAL.location}</span> based on a daily consumption target of {FIXED_PROPOSAL.dailyKWh} kWh/day.
        </p>
      </div>

      {/* Key Metrics Dashboard Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-emerald-50/80 border border-emerald-200/90 p-3.5 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">PV Array Capacity</p>
          <p className="text-xl font-extrabold text-emerald-900 mt-0.5">
            {FIXED_PROPOSAL.systemCapacityKW} <span className="text-xs font-semibold">kWp</span>
          </p>
          <p className="text-[10px] text-emerald-700 mt-1">
            {FIXED_PROPOSAL.totalPanels}× {FIXED_PROPOSAL.panelWattage}W Panels
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Battery Bank</p>
          <p className="text-xl font-extrabold text-slate-800 mt-0.5">
            {FIXED_PROPOSAL.requiredBatteryKWh} <span className="text-xs font-semibold">kWh</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-1 truncate">LiFePO4 Lith</p>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Inverter Rating</p>
          <p className="text-xl font-extrabold text-slate-800 mt-0.5">
            {FIXED_PROPOSAL.inverterRatingKW} <span className="text-xs font-semibold">kW</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Hybrid Smart</p>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Est. Payback</p>
          <p className="text-xl font-extrabold text-slate-800 mt-0.5">
            {FIXED_PROPOSAL.paybackYears} <span className="text-xs font-semibold">Years</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-1">25-Year ROI</p>
        </div>
      </div>

      {/* Bill of Materials (BOM) Breakdown */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
          Recommended Hardware Bill of Materials (BOM)
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-2.5 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">
                {FIXED_PROPOSAL.totalPanels}× Mono-PERC Solar Panels ({FIXED_PROPOSAL.panelWattage}W)
              </p>
              <p className="text-[11px] text-slate-500">Tier-1 Monocrystalline, 21.5% Efficiency</p>
            </div>
            <span className="font-mono font-medium text-slate-700">{FIXED_PROPOSAL.systemCapacityKW} kWp Total</span>
          </div>

          <div className="py-2.5 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">
                {FIXED_PROPOSAL.inverterRatingKW}kW Intelligent Hybrid Inverter
              </p>
              <p className="text-[11px] text-slate-500">Dual MPPT, KPLC Grid-tie with automatic switchover</p>
            </div>
            <span className="font-mono font-medium text-slate-700">1 Unit</span>
          </div>

          <div className="py-2.5 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">
                {FIXED_PROPOSAL.requiredBatteryKWh} kWh Lithium Storage Bank
              </p>
              <p className="text-[11px] text-slate-500">{FIXED_PROPOSAL.batteryTypeLabel}</p>
            </div>
            <span className="font-mono font-medium text-slate-700">8 Hours Backup</span>
          </div>

          <div className="py-2.5 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">Roof Mounting & Safety Protection Balance</p>
              <p className="text-[11px] text-slate-500">Aluminum mounting rails, DC/AC Isolators, Surge Protection (SPD)</p>
            </div>
            <span className="font-mono font-medium text-slate-700">Included</span>
          </div>
        </div>
      </div>

      {/* Financial Return on Investment Box */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Turnkey System Price</p>
            <p className="text-2xl font-black tracking-tight text-emerald-400">
              KES {FIXED_PROPOSAL.totalEstimatedCostKES.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Est. Monthly KPLC Savings</p>
            <p className="text-lg font-bold text-white">
              KES {FIXED_PROPOSAL.monthlySavingsKES.toLocaleString()} / mo
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400">
            * Turnkey cost includes equipment supply, mounting structure, installation labor, and EPRA documentation.
          </p>
          <button
            type="button"
            onClick={() => setDownloaded(true)}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition cursor-pointer shrink-0 w-full sm:w-auto"
          >
            {downloaded ? '✓ Proposal Downloaded' : 'Download PDF Proposal'}
          </button>
        </div>
      </div>

      {/* Submit Action Banner */}
      <div className="pt-2 text-center space-y-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full py-3 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting System Request...' : 'Request Site Assessment & Engineer Contact'}
        </button>
        <p className="text-[11px] text-slate-500">
          A certified solar engineer in Nairobi will review your requirements and reach out within 24 hours.
        </p>
      </div>
    </div>
  );
}