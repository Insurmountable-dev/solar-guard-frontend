export const ROOF_TYPES = [
  {
    value: 'aluminium_sheets',
    label: 'Aluminium Sheets',
    description: 'Lightweight, rust-free metal sheets. Panels can be fixed with standard rail clamps.',
    suitability: 'high',
  },
  {
    value: 'asbestos_fiber_cement',
    label: 'Asbestos / Fiber Cement',
    description: 'Brittle older sheets. Drilling or walking on them is unsafe, so the roof usually needs replacing or a ground mount first.',
    badge: 'Health Risk',
    suitability: 'low',
  },
  {
    value: 'clay_concrete_tiles',
    label: 'Clay / Concrete Tiles',
    description: 'Heavy tiles that crack easily. Installers use special hooks that slide under the tiles.',
    suitability: 'medium',
  },
  {
    value: 'concrete_slab_flat',
    label: 'Concrete Slab (Flat Roof)',
    description: 'Strong and flat. Panels sit on tilted frames, which also lets you pick the best angle.',
    badge: 'Easy Mounting',
    suitability: 'high',
  },
  {
    value: 'grass_thatch',
    label: 'Grass Thatch',
    description: 'Weak and a fire risk. Panels should go on a separate ground or pole mount instead.',
    badge: 'Not Suitable',
    suitability: 'none',
  },
  {
    value: 'ground_mount',
    label: 'Ground Mount / Open Yard',
    description: 'Panels are installed on a frame in the compound. Needs open, unshaded space and a secure fence.',
    suitability: 'high',
  },
  {
    value: 'mabati_box_profile',
    label: 'Iron Sheet / Mabati (Box Profile)',
    description: 'Raised flat ribs give secure clamping points. One of the best roofs for solar in Kenya.',
    badge: 'Best for Solar',
    suitability: 'high',
  },
  {
    value: 'mabati_corrugated',
    label: 'Iron Sheet / Mabati (Corrugated)',
    description: 'The most common Kenyan roof. Panels are fixed with hooks and sealed brackets on the ridges.',
    suitability: 'high',
  },
  {
    value: 'mabati_kliplock',
    label: 'Iron Sheet / Mabati (Kliplock / Standing Seam)',
    description: 'Clamps grip the seams without drilling holes, so there is no leak risk.',
    badge: 'No Drilling',
    suitability: 'high',
  },
  {
    value: 'mabati_tile_profile',
    label: 'Iron Sheet / Mabati (Tile Profile)',
    description: 'Metal sheets shaped like tiles. Mountable, but installers need brackets made for the profile.',
    suitability: 'medium',
  },
  {
    value: 'makuti_palm_thatch',
    label: 'Makuti (Palm Thatch)',
    description: 'Common on the coast. It cannot carry panel weight and is a fire risk, so use a ground mount.',
    badge: 'Not Suitable',
    suitability: 'none',
  },
  {
    value: 'mud_earth_roof',
    label: 'Mud / Earth Roof',
    description: 'Cannot hold fixings or weight. Panels need a separate frame or ground mount.',
    badge: 'Not Suitable',
    suitability: 'none',
  },
  {
    value: 'polycarbonate_fibreglass',
    label: 'Polycarbonate / Fibreglass Sheets',
    description: 'Light plastic sheets that cannot support panels. The frame beneath would need to carry the load.',
    suitability: 'low',
  },
  {
    value: 'shingles_bitumen_asphalt',
    label: 'Shingles (Bitumen / Asphalt)',
    description: 'Soft layered shingles. Panels can be fixed to the decking underneath if properly sealed.',
    suitability: 'medium',
  },
  {
    value: 'slate_tiles',
    label: 'Slate Tiles',
    description: 'Heavy and brittle. Installation needs a specialist and carries a higher risk of breakage.',
    suitability: 'low',
  },
  {
    value: 'stone_coated_metal_tiles',
    label: 'Stone-Coated Metal Tiles',
    description: 'Strong and long-lasting. Panels mount on brackets fixed through the tiles to the battens.',
    suitability: 'high',
  },
  {
    value: 'tarpaulin_polythene',
    label: 'Tarpaulin / Polythene (Temporary)',
    description: 'Temporary cover with no structure. Panels need an independent mounting frame.',
    badge: 'Not Suitable',
    suitability: 'none',
  },
  {
    value: 'timber_wooden_shingles',
    label: 'Timber / Wooden Shingles',
    description: 'Can take mounting hooks if the timber underneath is sound. Check for rot first.',
    suitability: 'medium',
  },
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


export const MEASUREMENT_METHODS = [
    {
        value: "manual",
        label: "Manual measurement (e.g. Use Of Tape Measure)",
        description: "Most accurate option. Measured directly on site with a tape measure or laser meter.",
        badge: "Most Accurate",
    },
    {
        value: "estimated",
        label: "Estimated dimensions",
        description: "Approximate values from pacing or visual judgement. Good enough for a first estimate.",
    },
    {
        value: "satellite",
        label: "Satellite / map estimate",
        description: "Measured on Google Earth or a similar map. Works well for roof length and width.",
    },
    {
        value: "professional",
        label: "Professional assessment",
        description: "Measured by a surveyor, architect or solar technician.",
    },
];
