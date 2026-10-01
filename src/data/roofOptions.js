export const ROOF_TYPES = [
  'Aluminium Sheets',
  'Asbestos / Fiber Cement',
  'Clay / Concrete Tiles',
  'Concrete Slab (Flat Roof)',
  'Grass Thatch',
  'Ground Mount / Open Yard',
  'Iron Sheet / Mabati (Box Profile)',
  'Iron Sheet / Mabati (Corrugated)',
  'Iron Sheet / Mabati (Kliplock / Standing Seam)',
  'Iron Sheet / Mabati (Tile Profile)',
  'Makuti (Palm Thatch)',
  'Mud / Earth Roof',
  'Polycarbonate / Fibreglass Sheets',
  'Shingles (Bitumen / Asphalt)',
  'Slate Tiles',
  'Stone-Coated Metal Tiles',
  'Tarpaulin / Polythene (Temporary)',
  'Timber / Wooden Shingles',
];



export const ROOF_ORIENTATIONS = [
  {
    value: 'north',
    title: 'North Facing',
    description: 'Optimal tilt orientation for equatorial Kenya to maximize solar yield.',
    badge: 'Best Solar Yield',
  },
  {
    value: 'south',
    title: 'South Facing',
    description: 'Good secondary yield performance across seasonal sun paths.',
  },
  {
    value: 'east_west',
    title: 'East / West Facing',
    description: 'Provides balanced morning and afternoon peak power production.',
  },
  {
    value: 'flat',
    title: 'Flat / Angle Mounted',
    description: 'Mounted flat on slab roof or angled using elevated metal frames.',
  },
];

export const SHADING_LEVELS = [
  {
    value: 'none',
    title: 'No Shading (Full Sun)',
    description: 'Unobstructed sunlight from morning to evening.',
  },
  {
    value: 'partial',
    title: 'Partial Shading',
    description: 'Minor shade during early morning or late afternoon from nearby trees or walls.',
  },
  {
    value: 'heavy',
    title: 'Heavy Shading',
    description: 'Significant shade for majority of peak sunlight hours.',
  },
];