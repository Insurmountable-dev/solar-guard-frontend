import React from 'react';
import InputField from '../common/InputField';
import CardSelect from '../common/CardSelect';
import { ROOF_TYPES, ROOF_ORIENTATIONS, SHADING_LEVELS } from '../../data/roofOptions.js';

export default function Step2RoofDetails({ formData, onChange, onSelectChange, errors = {} }) {
  return (
    <div className="space-y-6 w-full max-w-xl mx-auto">
      {/* Header Info Banner */}
      <div className="space-y-1">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          Roof & Mounting Details
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Specify your roof dimensions, materials, and shade exposure to determine solar panel placement and mounting hardware.
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
        {/* Roof Material & Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <InputField
            label="Roof Material / Type"
            name="roof_type"
            type="select"
            value={formData.roof_type || ''}
            onChange={onChange}
            options={ROOF_TYPES}
            error={errors.roof_type}
            required
          />
          <InputField
            label="Available Roof Area (m²)"
            name="roof_area_sqm"
            type="number"
            placeholder="e.g. 45"
            value={formData.roof_area_sqm || ''}
            onChange={onChange}
            error={errors.roof_area_sqm}
            helperText="Rough estimate (approx. 2m² needed per 500W panel)"
            required
          />
        </div>

        {/* Roof Orientation */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-semibold text-slate-700">
            Roof Orientation / Direction <span className="text-rose-500">*</span>
          </label>
          <CardSelect
            options={ROOF_ORIENTATIONS}
            value={formData.roof_orientation || 'north'}
            onChange={(val) => onSelectChange('roof_orientation', val)}
            gridCols="grid-cols-1 sm:grid-cols-2"
          />
        </div>

        {/* Shading Exposure */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-semibold text-slate-700">
            Tree & Building Shading Exposure <span className="text-rose-500">*</span>
          </label>
          <CardSelect
            options={SHADING_LEVELS}
            value={formData.shading_level || 'none'}
            onChange={(val) => onSelectChange('shading_level', val)}
            gridCols="grid-cols-1 sm:grid-cols-3"
          />
        </div>
      </div>
    </div>
  );
}