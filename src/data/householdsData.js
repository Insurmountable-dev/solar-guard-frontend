export const HOUSE_TYPES = [
    {
        value: "stone",
        label: "Stone",
        description: "Very strong walls that can carry a roof and panel load with ease. Common in permanent homes.",
        badge: "Very Strong",
        support: "strong",
    },
    {
        value: "brick",
        label: "Burnt Brick",
        description: "Durable fired bricks. Walls handle the extra weight of panels and mounting frames well.",
        support: "strong",
    },
    {
        value: "concrete_block",
        label: "Concrete Blocks",
        description: "Standard modern walling. Strong, uniform and well suited to solar installations.",
        support: "strong",
    },
    {
        value: "mud",
        label: "Mud",
        description: "Plain mud walls are weak and weather easily. Panels are safer on a separate pole or ground mount.",
        support: "weak",
    },
    {
        value: "mud_brick",
        label: "Mud Bricks",
        description: "Sun-dried bricks with moderate strength. Fine for light loads if the walls are in good condition.",
        support: "moderate",
    },
    {
        value: "wattle_and_daub",
        label: "Wattle and Daub",
        description: "Woven sticks plastered with mud. Light structure that is not suited to carrying extra roof weight.",
        support: "weak",
    },
    {
        value: "mabati",
        label: "Mabati (Iron Sheets)",
        description: "Iron-sheet walls on a timber or metal frame. Strength depends on the frame, not the sheets.",
        support: "moderate",
    },
    {
        value: "timber",
        label: "Timber / Wood",
        description: "Can support panels if the timber is sound. Check for rot and termite damage first.",
        support: "moderate",
    },
    {
        value: "bamboo",
        label: "Bamboo",
        description: "Light and flexible. Not recommended for carrying panels, so a ground mount is safer.",
        support: "weak",
    },
    {
        value: "poles_and_mud",
        label: "Poles and Mud",
        description: "Timber poles filled with mud. Poles carry the load, but weight should be kept minimal.",
        support: "weak",
    },
    {
        value: "adobe",
        label: "Adobe / Earth Blocks",
        description: "Thick earth blocks with fair strength. Good for modest loads when kept dry and well plastered.",
        support: "moderate",
    },
    {
        value: "rammed_earth",
        label: "Rammed Earth",
        description: "Compacted earth walls that are thick and fairly strong when built properly.",
        support: "moderate",
    },
    {
        value: "concrete",
        label: "Cast Concrete",
        description: "Poured concrete walls, the strongest option. Easy to fix mounting brackets to.",
        badge: "Very Strong",
        support: "strong",
    },
    {
        value: "cement_stabilized_blocks",
        label: "Stabilized Soil Blocks",
        description: "Earth blocks strengthened with cement. Stronger than plain mud bricks and good for panel loads.",
        support: "strong",
    },
    {
        value: "stone_and_mud",
        label: "Stone and Mud",
        description: "Stones bound with mud mortar. Fairly strong, but the mortar weakens with moisture over time.",
        support: "moderate",
    },
    {
        value: "brick_and_concrete",
        label: "Brick and Concrete",
        description: "Brick walls with concrete beams or columns. A strong, well-reinforced structure.",
        support: "strong",
    },
    {
        value: "timber_and_mabati",
        label: "Timber and Mabati",
        description: "Timber frame covered in iron sheets. Fine for panels if the frame is solid.",
        support: "moderate",
    },
    {
        value: "stone_and_mabati",
        label: "Stone and Mabati",
        description: "Stone walls topped with an iron-sheet roof. Strong walls and a very common Kenyan combination.",
        support: "strong",
    },
    {
        value: "mixed",
        label: "Mixed Materials",
        description: "Different wall materials in one house. The weakest section decides how much load is safe.",
        support: "moderate",
    },
    {
        value: "other",
        label: "Other",
        description: "Any wall material not listed. An installer will check it during the site visit.",
        support: "moderate",
    },
];

export const BUILDING_TYPES = [
    {
        value: "bungalow",
        label: "Bungalow",
        description: "Single-storey house. Easy roof access, which keeps installation simple and cheaper.",
        badge: "Easy Access",
    },
    {
        value: "maisonette",
        label: "Maisonette",
        description: "Two-storey house with an upstairs and downstairs. Roof access needs a longer ladder.",
    },
    {
        value: "apartment",
        label: "Apartment / Flat",
        description: "Unit inside a shared building. The roof is usually shared, so you may need approval from the landlord or management.",
        badge: "Shared Roof",
    },
    {
        value: "storey",
        label: "Storey Building",
        description: "Multi-level building. The roof is high up, so installers need scaffolding or fall protection.",
    },
    {
        value: "duplex",
        label: "Duplex",
        description: "Two homes in one building. Roof space may be split between both units.",
    },
    {
        value: "townhouse",
        label: "Townhouse",
        description: "Row house sharing walls with neighbours. Roof area can be narrow and shade from adjoining buildings is common.",
    },
    {
        value: "swahili_house",
        label: "Swahili House",
        description: "Coastal-style house, often with a flat or makuti roof. Check the roof type carefully.",
    },
    {
        value: "traditional_house",
        label: "Traditional House / Kienyeji",
        description: "Home built from local materials such as mud and thatch. The roof often cannot carry panels.",
    },
    {
        value: "manyatta",
        label: "Manyatta",
        description: "Traditional round hut, common in pastoral communities. Usually needs a pole or ground mount.",
        badge: "Ground Mount",
    },
    {
        value: "shack",
        label: "Shack / Kibanda",
        description: "Small, lightly built structure. Panels are usually safer on a separate frame nearby.",
    },
    {
        value: "rural_homestead",
        label: "Rural Homestead / Boma",
        description: "Compound with several buildings. Usually has space for a ground mount or the strongest roof.",
    },
    {
        value: "mabati_house",
        label: "Iron-Sheet House / Nyumba ya Mabati",
        description: "House with iron-sheet walls and roof. Panels can be fixed to the roof if the frame is sturdy.",
    },
    {
        value: "timber_house",
        label: "Timber House / Nyumba ya Mbao",
        description: "House built mainly from wood. Check the timber is sound before fixing panels.",
    },
    {
        value: "semi_permanent",
        label: "Semi-Permanent House",
        description: "A mix of lasting and temporary materials. An installer should check the structure first.",
    },
    {
        value: "permanent",
        label: "Permanent House",
        description: "Solid construction built to last. Generally the best candidate for rooftop panels.",
        badge: "Best for Solar",
    },
    {
        value: "other",
        label: "Other",
        description: "Any building type not listed. An installer will confirm details on site.",
    },
];


export const mabatiMaterials = [
  // Corrugated and gauge types
  {
    value: "corrugated_galvanized_iron/mabati_ya_mabonde_ya_chuma_cha_mabati",
    label: "Corrugated Galvanized Iron Sheets (Mabati ya Mabonde ya Chuma)",
    description: "The classic wavy zinc-coated iron sheet found on most Kenyan homes. Panels mount with hooks and sealed brackets on the ridges.",
  },
  {
    value: "corrugated_sheets/mabati_ya_mabonde",
    label: "Corrugated Sheets (Mabati ya Mabonde)",
    description: "General wavy roofing sheets. Fine for solar when fixed through the ridges into the purlins below.",
  },
  {
    value: "gauge_30/mabati_nyembamba_gauge_30",
    label: "Ordinary Gauge 30 Mabati (Mabati Nyembamba Gauge 30)",
    description: "The thinnest and cheapest common gauge. Dents easily, so panels must be fixed to the purlins and not the sheet alone.",
  },
  {
    value: "gauge_28/mabati_ya_kawaida_gauge_28",
    label: "Ordinary Gauge 28 Mabati (Mabati ya Kawaida Gauge 28)",
    description: "A thin, widely used gauge for homes. Handles panels well when brackets are fixed into the roof frame.",
  },
  {
    value: "gauge_26/mabati_mazito_gauge_26",
    label: "Ordinary Gauge 26 Mabati (Mabati Mazito Gauge 26)",
    description: "A medium-thickness sheet that is sturdier and lasts longer. A good base for panel brackets.",
  },
  {
    value: "gauge_24/mabati_mazito_zaidi_gauge_24",
    label: "Ordinary Gauge 24 Mabati (Mabati Mazito Zaidi Gauge 24)",
    description: "A thick, heavy-duty sheet that resists denting. Holds fixings securely and suits solar installations.",
  },
  {
    value: "gauge_22/mabati_mazito_sana_gauge_22",
    label: "Ordinary Gauge 22 Mabati (Mabati Mazito Sana Gauge 22)",
    description: "Very thick and strong, used for industrial or long-lasting roofs. Excellent for mounting panels.",
  },

  // Profiles
  {
    value: "box_profile/mabati_ya_sanduku",
    label: "Box Profile Mabati (Mabati ya Sanduku)",
    description: "Flat raised ribs give secure clamping points. One of the best roof profiles for solar in Kenya.",
    badge: "Best for Solar",
  },
  {
    value: "roman_tile/mabati_ya_vigae_vya_kirumi",
    label: "Roman Tile Profile Mabati (Mabati ya Vigae vya Kirumi)",
    description: "Metal sheets pressed to look like clay tiles. Panels need brackets made for the profile.",
  },
  {
    value: "versatile_profile/mabati_ya_matumizi_mengi",
    label: "Versatile Profile Mabati (Mabati ya Matumizi Mengi)",
    description: "A flexible profile used for roofs and walls. Mountable with standard sealed brackets on the ribs.",
  },
  {
    value: "euro_tile/mabati_ya_vigae_vya_kizungu",
    label: "Euro Tile Profile Mabati (Mabati ya Vigae vya Kizungu)",
    description: "Tile-look sheets with a stepped pattern. Installers need profile-specific brackets to avoid leaks.",
  },
  {
    value: "ibr_profile/mabati_ya_ibr",
    label: "IBR Profile Mabati (Mabati ya IBR)",
    description: "Trapezoid ribs with wide flat sections, common on commercial and farm buildings. Very easy to clamp panels onto.",
    badge: "Easy Mounting",
  },
  {
    value: "standing_seam/mabati_ya_viungo_vilivyosimama",
    label: "Standing Seam Roofing Sheets (Mabati ya Viungo Vilivyosimama)",
    description: "Raised joined seams let clamps grip without drilling, so there is no leak risk.",
    badge: "No Drilling",
  },
  {
    value: "trapezoidal_profile/mabati_ya_umbo_la_trapezoidi",
    label: "Trapezoidal Profile Mabati (Mabati ya Umbo la Trapezoidi)",
    description: "Sheets with flat-topped ribs. Brackets sit securely on the ribs, which makes it a good solar roof.",
  },
  {
    value: "wave_profile/mabati_ya_mawimbi",
    label: "Wave Profile Mabati (Mabati ya Mawimbi)",
    description: "Rounded wave-shaped sheets similar to corrugated. Mount with hooks and sealed brackets on the wave peaks.",
  },
  {
    value: "tile_effect/mabati_yenye_muonekano_wa_vigae",
    label: "Tile Effect Mabati (Mabati yenye Muonekano wa Vigae)",
    description: "Metal sheets styled to look like tiles. Mountable, but installers need matching brackets.",
  },
  {
    value: "shingle_profile/mabati_ya_vigae_vidogo",
    label: "Shingle Profile Mabati (Mabati ya Vigae Vidogo)",
    description: "Small shingle-style metal pieces. Panels fix to the battens beneath, so a careful install is needed.",
  },
  {
    value: "curved_sheets/mabati_yaliyopinda",
    label: "Curved Roofing Sheets (Mabati Yaliyopinda)",
    description: "Sheets bent into an arch, common on barrels and canopies. Panel fit is limited, so an installer should check the curve.",
  },

  // Coatings and finishes
  {
    value: "pre_painted/mabati_yaliyopakwa_rangi",
    label: "Pre-Painted Mabati (Mabati Yaliyopakwa Rangi)",
    description: "Factory-coloured sheets with a protective paint layer. Panels can be fixed normally, and sealing the holes protects the coating.",
  },
  {
    value: "galvanized/mabati_yaliyopakwa_zinki",
    label: "Galvanized Mabati (Mabati Yaliyopakwa Zinki)",
    description: "Steel sheets coated in zinc to resist rust. Strong and suitable for panel mounting.",
  },
  {
    value: "aluminium_zinc_coated/mabati_yaliyopakwa_alumini_na_zinki",
    label: "Aluminium-Zinc Coated Mabati (Mabati Yaliyopakwa Alumini na Zinki)",
    description: "Steel coated with an aluminium-zinc mix for longer life and better heat reflection. Very good for solar.",
  },
  {
    value: "galvalume/mabati_ya_galvalume",
    label: "Galvalume Roofing Sheets (Mabati ya Galvalume)",
    description: "Aluminium-zinc coated steel that resists corrosion well. A durable base that suits panel installation.",
  },
  {
    value: "decra_stone_coated/mabati_yaliyopakwa_mawe_decra",
    label: "Decra Stone-Coated Roofing Sheets (Mabati Yaliyopakwa Mawe - Decra)",
    description: "Steel tiles covered in stone chips. Strong and long-lasting. Panels mount on brackets fixed through to the battens.",
  },
  {
    value: "colour_coated/mabati_yenye_rangi",
    label: "Colour Coated Mabati (Mabati yenye Rangi)",
    description: "Sheets with a coloured finish for looks and protection. Seal every fixing hole to keep the coating intact.",
  },
  {
    value: "anti_rust_coated/mabati_yasiyo_ya_kutu",
    label: "Anti-Rust Coated Mabati (Mabati Yasiyo ya Kutu)",
    description: "Sheets treated to resist corrosion, good near the coast. Panels can be mounted with sealed brackets.",
  },
  {
    value: "anti_condensation/mabati_yasiyotoa_jasho",
    label: "Anti-Condensation Roofing Sheets (Mabati Yasiyotoa Jasho)",
    description: "Sheets with an underside layer that stops dripping moisture. Mountable, but avoid damaging the underside layer when drilling.",
  },
  {
    value: "insulated_sheets/mabati_yenye_kinga_ya_joto",
    label: "Insulated Roofing Sheets (Mabati yenye Kinga ya Joto)",
    description: "Metal sheets with an insulation layer that keeps the house cooler. Panels need longer fixings that reach the frame.",
  },
  {
    value: "sandwich_panel/mabati_ya_tabaka_mbili",
    label: "Sandwich Panel Roofing (Mabati ya Tabaka Mbili)",
    description: "Two metal skins with foam in between. Strong and well insulated, but fixings must be chosen carefully.",
  },

  // Brands and product names
  {
    value: "maxcover/mabati_ya_maxcover",
    label: "Maxcover Roofing Sheets (Mabati ya Maxcover)",
    description: "A branded roofing sheet from a Kenyan manufacturer. Panel mounting follows its profile, usually with ridge brackets.",
  },
  {
    value: "orientile/mabati_ya_orientile",
    label: "Orientile Roofing Sheets (Mabati ya Orientile)",
    description: "A branded tile-style roofing sheet. Use brackets made for the profile to avoid leaks.",
  },
  {
    value: "covermax/mabati_ya_covermax",
    label: "Covermax Roofing Sheets (Mabati ya Covermax)",
    description: "A branded roofing sheet in several profiles. Check which profile you have to pick the right brackets.",
  },
  {
    value: "dumuzas/mabati_ya_dumuzas",
    label: "Dumuzas Roofing Sheets (Mabati ya Dumuzas)",
    description: "A branded roofing sheet. Panels mount on the profile ribs with standard sealed brackets.",
  },
  {
    value: "royal_mabati/mabati_ya_royal",
    label: "Royal Mabati (Mabati ya Royal)",
    description: "A branded iron sheet sold in several gauges and profiles. Suitability depends on the profile you have.",
  },
  {
    value: "mabati_rolling_mills/mabati_ya_rolling_mills",
    label: "Mabati Rolling Mills Sheets (Mabati ya Rolling Mills)",
    description: "Sheets from a large Kenyan manufacturer, sold in many profiles and gauges. Mounting depends on the profile.",
  },

  // Non-steel alternatives
  {
    value: "polycarbonate/mabati_ya_polikaboneti",
    label: "Polycarbonate Roofing Sheets (Mabati ya Polikaboneti)",
    description: "Light, see-through plastic sheets. They cannot carry panels, so use the frame beneath or a ground mount.",
    badge: "Not Suitable",
  },
  {
    value: "transparent_sheets/mabati_yanayopitisha_mwanga",
    label: "Transparent Roofing Sheets (Mabati Yanayopitisha Mwanga)",
    description: "Clear sheets that let daylight through. They are weak and not suitable for mounting panels.",
    badge: "Not Suitable",
  },
  {
    value: "fibreglass/mabati_ya_nyuzinyuzi_za_glasi",
    label: "Fibreglass Roofing Sheets (Mabati ya Nyuzinyuzi za Glasi)",
    description: "Light, flexible sheets that cannot support panel weight. A separate frame or ground mount is safer.",
    badge: "Not Suitable",
  },
  {
    value: "aluminium/mabati_ya_alumini",
    label: "Aluminium Roofing Sheets (Mabati ya Alumini)",
    description: "Lightweight, rust-free sheets. Panels can be fixed with standard rail clamps and sealed brackets.",
  },
  {
    value: "copper/mabati_ya_shaba",
    label: "Copper Roofing Sheets (Mabati ya Shaba)",
    description: "Rare and expensive premium roofing. Mountable, but installers should use compatible fixings to avoid corrosion between metals.",
  },
  {
    value: "zinc/mabati_ya_zinki",
    label: "Zinc Roofing Sheets (Mabati ya Zinki)",
    description: "Pure zinc sheets, durable and weather-resistant. Panels mount well with sealed brackets.",
  },
  {
    value: "asbestos/mabati_ya_asbesto",
    label: "Asbestos Roofing Sheets (Mabati ya Asbesto)",
    description: "Older fibre-cement sheets that contain asbestos. Drilling or walking on them releases harmful dust, so do not install panels on them.",
    badge: "Health Risk",
  },
  {
    value: "pvc_roofing/mabati_ya_plastiki_pvc",
    label: "PVC Roofing Sheets (Mabati ya Plastiki - PVC)",
    description: "Lightweight plastic sheets. They cannot carry panels, so use a separate frame or ground mount.",
    badge: "Not Suitable",
  },
  {
    value: "clay_tiles/vigae_vya_udongo",
    label: "Clay Roofing Tiles (Vigae vya Udongo)",
    description: "Heavy tiles that crack easily. Installers use special hooks that slide under the tiles.",
  },
  {
    value: "concrete_tiles/vigae_vya_zege",
    label: "Concrete Roofing Tiles (Vigae vya Zege)",
    description: "Heavy and strong tiles. Panels mount with tile hooks fixed to the battens beneath.",
  },
  {
    value: "thatch/makuti",
    label: "Thatch Roofing (Makuti)",
    description: "Palm or grass thatch common on the coast. It cannot carry panels and is a fire risk, so use a ground mount.",
    badge: "Not Suitable",
  },

  // Accessories
  {
    value: "ridge_cap/kofia_ya_paa",
    label: "Ridge Cap (Kofia ya Paa)",
    description: "The cover along the top where two roof slopes meet. It is a roof part, not a sheet material.",
  },
  {
    value: "roofing_nails/misumari_ya_mabati",
    label: "Roofing Nails (Misumari ya Mabati)",
    description: "Fixings used to hold sheets to the roof frame. This is a roof part, not a sheet material.",
  },
  {
    value: "gutter/mfereji_wa_maji_ya_mvua",
    label: "Gutter (Mfereji wa Maji ya Mvua)",
    description: "The channel that carries rainwater off the roof. It is a roof part, not a sheet material.",
  },
  {
    value: "flashing/kingo_za_paa",
    label: "Flashing (Kingo za Paa)",
    description: "Metal strips that seal joins and edges against leaks. This is a roof part, not a sheet material.",
  },
  {
    value: "Other/Mabati Zingine",
    label: "Other/Mabati Zingine",
    description: "Any roofing material not listed. An installer will check it during the site visit.",
  },
];