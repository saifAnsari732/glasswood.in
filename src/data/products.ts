export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  specifications: string[];
}

export const products: Product[] = [
  {
    id: "cnc-wood-carving",
    name: "CNC Wood Carving Mirror",
    price: "₹8,999",
    image: "/images/cnc_wood_carving_1782718789445.jpg",
    category: "Wooden",
    description: "Meticulously carved CNC wooden borders combined with our premium HD glass mirror. Designed to be a striking centerpiece in luxury living spaces.",
    specifications: [
      "Authentic Teak/Oak frame structure",
      "CNC precision-carved traditional borders",
      "6mm double-coated HD glass reflection",
      "Sanded and oil-rubbed organic finish"
    ]
  },
  {
    id: "calligraphy-mirror",
    name: "Calligraphy Premium Mirror",
    price: "₹6,499",
    image: "/images/calligraphy_mirror_1782718741704.jpg",
    category: "Modern",
    description: "An elegant blend of script lettering artistry and high-definition reflection. A modern classic statement piece for entryways.",
    specifications: [
      "Custom gold-foil border calligraphy",
      "Organic frame shape support",
      "5mm crystal-clear glass",
      "Pre-installed heavy-duty wall mounts"
    ]
  },
  {
    id: "islamic-glass-1",
    name: "Islamic Glass Artistry Series 1",
    price: "₹5,899",
    image: "/images/islamic_glass_1_1782718887112.jpg",
    category: "Modern",
    description: "Fine precision-engraved spiritual calligraphy on double-layered glass. Fills your room with soft glowing reflections.",
    specifications: [
      "Engraved spiritual inscriptions",
      "Teal-green stained glass framing accents",
      "Distortion-free HD backing",
      "Premium moisture-resistant finish"
    ]
  },
  {
    id: "islamic-glass-2",
    name: "Islamic Glass Artistry Series 2",
    price: "₹5,899",
    image: "/images/islamic_glass_2_1782718899436.jpg",
    category: "Modern",
    description: "Modern calligraphic lettering set against rich deep green border trims. Brings depth and peace to contemporary bedrooms.",
    specifications: [
      "Handcrafted script overlay detailing",
      "Premium forest green border lacquer",
      "Safety shatter-proof backing film",
      "Includes premium installation hardware"
    ]
  },
  {
    id: "islamic-glass-3",
    name: "Islamic Glass Artistry Series 3",
    price: "₹7,200",
    image: "/images/islamic_glass_3_1782718912468.jpg",
    category: "Modern",
    description: "Archway-style glass mirror featuring geometric calligraphy details. Perfect for focal points and feature walls.",
    specifications: [
      "Archway framing structural shape",
      "Traditional laser-etched script",
      "Thick teak foundation base support",
      "Triple-coated silver layer glass"
    ]
  },
  {
    id: "acrylic-signage",
    name: "Acrylic Neon-Border Signage",
    price: "₹4,500",
    image: "/images/acrylic_signage_1782718768113.jpg",
    category: "LED",
    description: "Modern acrylic script signage equipped with customizable LED backlighting. A vibrant, glowing addition to modern spaces.",
    specifications: [
      "Custom laser-cut acrylic script fonts",
      "Dual LED backlight (Warm/Neutral)",
      "Smart touch dimming controller",
      "Lightweight wall mounting system"
    ]
  }
];
