import React from 'react';
import CardSelect from '../common/CardSelect';
import InputField from '../common/InputField';
import { SYSTEM_TYPES, BATTERY_TYPES, AUTONOMY_HOURS_OPTIONS } from '../../data/systemOptions';

export default function Step4SystemType({
  formData,
  onSelectChange,
  onChange,
  errors = {},
}) {
  const isBatteryRequired = formData.system_type === 'hybrid' || formData.system_type === 'off_grid';

  return (
    <div className="space-y-6 w-full max-w-xl mx-auto">
      {/* Header Banner */}
      <div className="space-y-1">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          System Architecture & Battery Backup
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Select how your solar PV system interacts with the KPLC grid and specify your energy storage requirements.
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
        {/* System Architecture Select */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            System Type <span className="text-rose-500">*</span>
          </label>
          <CardSelect
            options={SYSTEM_TYPES}
            value={formData.system_type || 'hybrid'}
            onChange={(val) => onSelectChange('system_type', val)}
            gridCols="grid-cols-1"
          />
        </div>

        {/* Conditional Battery Storage Section */}
        {isBatteryRequired && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Battery Storage Options
            </h3>

            {/* Battery Chemistry Card Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Battery Technology
              </label>
              <CardSelect
                options={BATTERY_TYPES}
                value={formData.battery_type || 'lifepo4'}
                onChange={(val) => onSelectChange('battery_type', val)}
                gridCols="grid-cols-1 sm:grid-cols-2"
              />
            </div>

            {/* Backup Autonomy Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <InputField
                label="Desired Backup Duration (Hours)"
                name="backup_autonomy_hours"
                type="select"
                value={formData.backup_autonomy_hours || '8'}
                onChange={onChange}
                options={AUTONOMY_HOURS_OPTIONS.map((opt) => opt.label)}
                error={errors.backup_autonomy_hours}
                helperText="Estimated hours system operates on battery during grid failure"
              />
              <InputField
                label="Essential Load Priority (%)"
                name="essential_load_percentage"
                type="number"
                placeholder="e.g. 70"
                value={formData.essential_load_percentage || '100'}
                onChange={onChange}
                helperText="% of total household appliances powered on backup"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}