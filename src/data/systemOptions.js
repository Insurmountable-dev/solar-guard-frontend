export const SYSTEM_TYPES = [
  {
    value: 'hybrid',
    title: 'Hybrid System (Grid + Battery)',
    description: 'Runs solar daytime usage, charges battery for evening peak hours, and provides seamless backup during KPLC power cuts.',
    badge: 'Recommended for Kenya',
  },
  {
    value: 'grid_connected',
    title: 'Grid-Tied / On-Grid',
    description: 'No batteries required. Directly reduces daytime Kenya Power electricity bills. Shuts down during power outages for grid safety.',
    badge: 'Lowest Capital Cost',
  },
  {
    value: 'off_grid',
    title: 'Off-Grid Standalone',
    description: 'Completely disconnected from Kenya Power. Relies 100% on solar PV arrays, high-capacity battery storage, and optional generator backup.',
    badge: 'Complete Independence',
  },
];

export const BATTERY_TYPES = [
  {
    value: 'lifepo4',
    title: 'Lithium Iron Phosphate (LiFePO4)',
    description: 'Long lifespan (10–15 years, 6,000+ cycles), 90% Depth of Discharge (DoD), high thermal safety.',
    badge: 'Industry Standard',
  },
  {
    value: 'gel_lead',
    title: 'Gel / Tubular Lead-Acid',
    description: 'Lower upfront purchase cost, 3–5 year lifespan, 50% max recommended Depth of Discharge.',
  },
];

export const AUTONOMY_HOURS_OPTIONS = [
  { value: '4', label: '4 Hours (Evening peak cut)' },
  { value: '8', label: '8 Hours (Overnight backup)' },
  { value: '12', label: '12 Hours (Half-day backup)' },
  { value: '24', label: '24 Hours (Full day outage protection)' },
];