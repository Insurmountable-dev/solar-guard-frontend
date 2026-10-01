import React from 'react';
import CardSelect from '../common/CardSelect';
import InputField from '../common/InputField';
import { PAYMENT_MODES, KPLC_TARIFF_TYPES } from '../../data/financialOptions';

export default function Step5Financials({
  formData,
  onSelectChange,
  onChange,
  errors = {},
}) {
  return (
    <div className="space-y-6 w-full max-w-xl mx-auto">
      {/* Header Banner */}
      <div className="space-y-1">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          Financing, Budget & Tariff Settings
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Help us evaluate financial return on investment (ROI), payback period, and payback schedule for your installation.
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
        {/* Preferred Payment Method */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Preferred Payment Structure <span className="text-rose-500">*</span>
          </label>
          <CardSelect
            options={PAYMENT_MODES}
            value={formData.payment_mode || 'outright_cash'}
            onChange={(val) => onSelectChange('payment_mode', val)}
            gridCols="grid-cols-1"
          />
        </div>

        {/* Budget Limit & Currency */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <InputField
            label="Estimated Budget Target (KES)"
            name="budget_target_kes"
            type="number"
            placeholder="e.g. 500000"
            value={formData.budget_target_kes || ''}
            onChange={onChange}
            error={errors.budget_target_kes}
            helperText="Leave empty to calculate optimum budget automatically"
          />
          <InputField
            label="Expected System Lifespan (Years)"
            name="target_payback_years"
            type="number"
            placeholder="25"
            value={formData.system_lifespan_years || '25'}
            onChange={onChange}
            helperText="Standard Tier-1 Solar Panels are rated for 25 years"
          />
        </div>

        {/* Kenya Power Tariff Classification */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-semibold text-slate-700">
            Kenya Power (KPLC) Meter & Tariff Category
          </label>
          <CardSelect
            options={KPLC_TARIFF_TYPES}
            value={formData.kplc_tariff_code || 'dc_domestic'}
            onChange={(val) => onSelectChange('kplc_tariff_code', val)}
            gridCols="grid-cols-1"
          />
        </div>
      </div>
    </div>
  );
}