import {
    Lightbulb,
    Lightbulb as FluorescentLight,
    ShieldCheck,
    Sun,
    Tv,
    Speaker,
    Radio,
    Gamepad2,
    Projector,
    CookingPot,
    Microwave,
    Refrigerator,
    Snowflake,
    Heater,
    Soup,
    Blender,
    Coffee,
    Droplets,
    Laptop,
    Monitor,
    Router,
    Printer,
    HardDrive,
    Smartphone,
    Tablet,
    Camera,
    Siren,
    Lock,
    Fan,
    AirVent,
    Shirt,
    WashingMachine,
    Wind,
    ShowerHead,
    Flame,
    Thermometer,
    Plug,
    Waves,
    Drill,
    Scissors,
    Zap,
    Milk,
    Stethoscope,
    Activity,
    Scan,
    HeartPulse,
    Phone,
    Satellite,
    Signal,
    Network,
    Server,
    Egg,
    Sprout,
    PawPrint,
    Baby,
    Wrench,
    Brush,
    Store,
    Calculator,
    ClipboardList,
    FileSearch,
    Banknote,
    RadioTower,
    Package
} from "lucide-react";


const APPLIANCE_ICONS = {

    // Lighting
    "led bulb": Lightbulb,
    "fluorescent tube": FluorescentLight,
    "outdoor security light": ShieldCheck,
    "solar security light": Sun,
    "decorative led strip": Lightbulb,

    // Entertainment
    "led television": Tv,
    "decoder": Tv,
    "home theatre system": Speaker,
    "bluetooth speaker": Speaker,
    "radio": Radio,
    "gaming console": Gamepad2,
    "projector": Projector,

    // Kitchen
    "electric kettle": CookingPot,
    "microwave oven": Microwave,
    "refrigerator": Refrigerator,
    "chest freezer": Snowflake,
    "electric cooker": CookingPot,
    "induction cooker": CookingPot,
    "rice cooker": CookingPot,
    "blender": Blender,
    "food processor": Blender,
    "electric pressure cooker": CookingPot,
    "air fryer": CookingPot,
    "coffee maker": Coffee,
    "electric water dispenser": Droplets,
    "electric oven": CookingPot,

    // Electronics
    "laptop": Laptop,
    "desktop computer": Monitor,
    "computer monitor": Monitor,
    "wi-fi router": Router,
    "desktop printer": Printer,
    "laser printer": Printer,
    "desktop computer ups": Zap,
    "mobile phone charger": Plug,
    "tablet": Tablet,
    "external hard drive": HardDrive,

    // Security
    "cctv camera": Camera,
    "cctv recorder": HardDrive,
    "electric security fence": ShieldCheck,
    "alarm system": Siren,
    "electric gate motor": Lock,

    // Cooling
    "ceiling fan": Fan,
    "standing fan": Fan,
    "wall fan": Fan,
    "air conditioner": AirVent,
    "portable air cooler": Wind,
    "refrigerated display cabinet": Refrigerator,
    "greenhouse fan and misting system": Sprout,

    // Heating
    "electric iron": Wrench,
    "garment steamer": Waves,
    "electric shower": ShowerHead,
    "immersion water heater": Heater,
    "electric room heater": Heater,
    "hair dryer": Wind,
    "electric water boiler": Heater,



    // Laundry
    "washing machine": WashingMachine,
    "clothes dryer": Wind,
    "steam iron station": Wrench,

    // Cleaning
    "vacuum cleaner": Wind,
    "pressure washer": Waves,
    "electric mop": Brush,

    // Water
    "small water pump": Droplets,
    "borehole pump": Droplets,
    "pressure booster pump": Droplets,
    "electric water dispenser pump": Droplets,

    // Tools and Business
    "electric drill": Drill,
    "angle grinder": Wrench,
    "welding machine": Zap,
    "sewing machine": Scissors,
    "commercial refrigerator": Refrigerator,
    "commercial deep fryer": CookingPot,
    "electric posho mill": Wrench,

    // Tailoring
    "industrial sewing machine": Scissors,
    "fabric cutting machine": Scissors,
    "embroidery machine": Scissors,

    // Salon and Kinyozi
    "hair clipper": Scissors,
    "salon hair dryer": Wind,
    "hair steamer": Waves,
    "uv nail lamp": Lightbulb,
    "electric barber shaver": Scissors,

    // Office and Cyber
    "photocopier": Printer,
    "document scanner": Scan,
    "point of sale terminal": Calculator,
    "cash register": Banknote,
    "network switch": Network,
    "server": Server,

    // Agriculture
    "electric incubator": Egg,
    "poultry brooder heater": Heater,
    "electric milking machine": Milk,
    "electric chaff cutter": Sprout,
    "greenhouse water pump": Droplets,
    "laboratory incubator and water bath": Thermometer,

    // Medical
    "oxygen concentrator": Activity,
    "nebulizer": Stethoscope,
    "laboratory centrifuge": Activity,
    "medical refrigerator": Refrigerator,
    "laboratory water bath": Thermometer,

    // Communication
    "mobile phone": Smartphone,
    "landline telephone": Phone,
    "two-way radio": Radio,
    "satellite internet terminal": Satellite,
    "cellular signal booster": Signal,

};


export default function ApplianceIcon({ name, size = 20, className = ""}) {

    const normalizedName = name?.trim().toLowerCase();

    const Icon = APPLIANCE_ICONS[normalizedName] || Package;

    return (
        <Icon
            size={size}
            className={className}
            aria-hidden="true"
        />
    );

};