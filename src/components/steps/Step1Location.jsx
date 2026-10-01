import React from 'react';
import InputField from '../common/InputField';
import { KENYA_COUNTIES } from '../../data/counties';

export default function Step1Location({ formData, onChange, errors = {} }) {
  return (
    
    <div className="space-y-6 w-full max-w-lg mx-auto">
      {/* Header info banner */}
      <div className="space-y-1">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          Contact & Location Details
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Provide your location so we can calculate solar irradiance, peak sun hours, and regional electricity tariffs.
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        {/* Full Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <InputField
            label="First Name"
            name="first_name"
            placeholder="e.g. Kevin"
            value={formData.first_name || ''}
            onChange={onChange}
            error={errors.first_name}
            required
          />
          <InputField
            label="Last Name"
            name="last_name"
            placeholder="e.g. Njoroge"
            value={formData.last_name || ''}
            onChange={onChange}
            error={errors.last_name}
            required
          />
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="kevin@example.com"
            value={formData.email || ''}
            onChange={onChange}
            error={errors.email}
            required
          />
          <InputField
            label="Phone Number"
            name="phone_number"
            placeholder="0712345678"
            value={formData.phone_number || ''}
            onChange={onChange}
            error={errors.phone_number}
            helperText="Used for Kenya Power SMS bill alerts"
          />
        </div>

        {/* Location Dropdowns */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <InputField
            label="County"
            name="county"
            type="select"
            value={formData.county || ''}
            onChange={onChange}
            options={KENYA_COUNTIES}
            error={errors.county}
            required
          />
          <InputField
            label="Town / Area Name"
            name="town"
            placeholder="e.g. Westlands, Ruiru"
            value={formData.town || ''}
            onChange={onChange}
            error={errors.town}
          />
        </div>
      </div>
    </div>
  );
}