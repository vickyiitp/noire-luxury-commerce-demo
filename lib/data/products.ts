import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'chrono-noir-1',
    code: 'HA-2026-001',
    name: 'Chrono Noir I',
    frenchName: 'Chrono Noir Premier Edition',
    subtitle: 'Flying Tourbillon in Matte DLC Titanium & Sapphire',
    category: 'horlogerie',
    price: 48500,
    edition: 'NEW OBJECTS',
    featured: true,
    description: 'A masterwork of micro-engineering. Encased in grade 5 matte DLC titanium with a hand-polished chamfered bezel, houses a hand-wound manufacture flying tourbillon movement with a 72-hour power reserve.',
    craftsmanship: 'Assembled by master watchmakers in Le Locle, Switzerland over 140 meticulous hours. Features Geneva stripes, mirror-polished bridges, and a skeletonized architectural dial.',
    origin: 'Geneva / Le Locle, Switzerland',
    dimensions: '41mm Diameter x 11.2mm Thickness',
    weight: '78g (Ultralight Titanium)',
    details: [
      'Manual-wind Manufacture Calibre N-01',
      '21,600 vph (3 Hz) with silicon escapement',
      'Dual anti-reflective sapphire crystal box',
      'Custom alligator strap with titanium folding clasp',
      'Water resistant to 50 meters (5 ATM)'
    ],
    variants: [
      {
        id: 'v-obsidian',
        name: 'Obsidian Black',
        colorHex: '#111113',
        materialName: 'Matte DLC Grade 5 Titanium',
        roughness: 0.35,
        metalness: 0.85,
        previewColor: '#1a1a1d'
      },
      {
        id: 'v-champagne',
        name: 'Champagne Gold',
        colorHex: '#d4af37',
        materialName: '18k Champagne Gold Satin',
        roughness: 0.25,
        metalness: 0.95,
        previewColor: '#e5c158'
      },
      {
        id: 'v-platinum',
        name: 'Raw Platinum',
        colorHex: '#e5e4e2',
        materialName: '950 Brushed Platinum',
        roughness: 0.2,
        metalness: 0.98,
        previewColor: '#d6d6d8'
      }
    ],
    modelType: 'watch',
    modelScale: 1.2,
    accentColor: '#d4af37'
  },
  {
    id: 'elixir-obsidien',
    code: 'PA-2026-004',
    name: "L'Élixir Obsidien",
    frenchName: "L'Élixir Obsidien Extract de Parfum",
    subtitle: 'Concentrated Extract de Parfum (100ml)',
    category: 'parfumerie',
    price: 1850,
    edition: 'ICONS',
    featured: true,
    description: 'An enveloping sensory aura of smoked oud, rare black iris, Madagascar bourbon vanilla, and hand-extracted ambergris. Held inside a hand-cut obsidian crystal monolith.',
    craftsmanship: 'Hand-blended in Grasse, France using centuries-old enfleurage methods. Aged in charred oak casks for 18 months prior to bottling.',
    origin: 'Grasse, France',
    dimensions: '145mm Height x 65mm Base Width',
    weight: '620g (Solid Crystal Flacon)',
    details: [
      'Top Notes: Black Pepper, Smoked Frankincense, Bergamot',
      'Heart Notes: Florentine Black Iris, Night-blooming Jasmine, Cedarwood',
      'Base Notes: Natural Cambodian Oud, Ambergris, Bourbon Vanilla',
      'Hand-numbered flacon signed by the Master Perfumer',
      'Includes custom suede traveling vault'
    ],
    variants: [
      {
        id: 'v-amber-glass',
        name: 'Smoked Obsidian',
        colorHex: '#1f1610',
        materialName: 'Heavy Smoked Crystal & Gold Collar',
        roughness: 0.1,
        metalness: 0.2,
        previewColor: '#2b1d14'
      },
      {
        id: 'v-clear-crystal',
        name: 'Pure Quartz',
        colorHex: '#ffffff',
        materialName: 'Optically Clear Quartz Glass',
        roughness: 0.05,
        metalness: 0.1,
        previewColor: '#e0e5eb'
      }
    ],
    modelType: 'perfume',
    modelScale: 1.1,
    accentColor: '#c59b27'
  },
  {
    id: 'oculus-sac',
    code: 'LE-2026-008',
    name: "L'Oculus Structured Tote",
    frenchName: "L'Oculus Sac Structure En Cuir",
    subtitle: 'Sculpted Calfskin & Polished Brass Clasp',
    category: 'leatherware',
    price: 12400,
    edition: 'NEW OBJECTS',
    featured: true,
    description: 'Architectural geometry meeting soft touch. The Oculus features an elliptical gold-plated structural lock that seals a seamless outer shell of full-grain French box calfskin.',
    craftsmanship: 'Crafted entirely by hand in the Parisian Atelier. Takes 36 hours of precision edge-painting, saddle stitching, and hardware fitting.',
    origin: 'Paris, France',
    dimensions: '32cm Width x 24cm Height x 14cm Depth',
    weight: '980g',
    details: [
      'Full-grain French Box Calfskin exterior',
      'Supple Lambskin lining in Cognac tone',
      'Solid 24k Gold-plated brass hardware',
      'Dual internal compartments with zippered vault pocket',
      'Detachable ergonomic shoulder strap'
    ],
    variants: [
      {
        id: 'v-noir-leather',
        name: 'Midnight Onyx',
        colorHex: '#0c0c0e',
        materialName: 'Box Calfskin & 24k Gold Lock',
        roughness: 0.45,
        metalness: 0.1,
        previewColor: '#161619'
      },
      {
        id: 'v-espresso-leather',
        name: 'Espresso Eclipse',
        colorHex: '#2d1e18',
        materialName: 'Tanned Calfskin & Brushed Bronze Lock',
        roughness: 0.5,
        metalness: 0.1,
        previewColor: '#3d2a22'
      },
      {
        id: 'v-ivoire-leather',
        name: 'Ivoire Atelier',
        colorHex: '#f4f1ea',
        materialName: 'Natural Grain Calfskin & White Gold Lock',
        roughness: 0.4,
        metalness: 0.1,
        previewColor: '#e6e2d8'
      }
    ],
    modelType: 'handbag',
    modelScale: 1.3,
    accentColor: '#e0b354'
  },
  {
    id: 'solitaire-phantom',
    code: 'JO-2026-002',
    name: 'Solitaire Phantom',
    frenchName: 'Bague Solitaire Phantôme 4.5 Carats',
    subtitle: '4.5 Carat D-Flawless Type IIa Diamond Ring',
    category: 'joaillerie',
    price: 92000,
    edition: 'LIMITED',
    limitedCount: 15,
    featured: true,
    description: 'An ethereal floating solitaire setting crafted in 950 Platinum. A rare Type IIa emerald-cut diamond appears suspended in mid-air over a knife-edge architectural band.',
    craftsmanship: 'GIA & HRD Certified 4.50ct D Color, Flawless Clarity, Excellent Cut, Symmetry, and Polish. Set individually by Place Vendôme master jewelers.',
    origin: 'Place Vendôme, Paris',
    dimensions: 'Band width 1.8mm; Gemstone 11.2 x 8.4mm',
    weight: '8.4g Platinum',
    details: [
      '4.50 Carat Emerald Cut Type IIa Natural Diamond',
      'D Color, Flawless (FL), Triple Excellent rating',
      'Micro-pave hidden halo diamonds (0.35ct total)',
      'Constructed in 950 Solid Platinum',
      'Laser-inscribed authenticity serial on girdle'
    ],
    variants: [
      {
        id: 'v-platine',
        name: 'Platinum 950',
        colorHex: '#e8e8ea',
        materialName: '950 Solid Platinum',
        roughness: 0.1,
        metalness: 0.99,
        previewColor: '#e2e2e5'
      },
      {
        id: 'v-or-rose',
        name: 'Rose Gold 18k',
        colorHex: '#e8a598',
        materialName: '18k Warm Rose Gold',
        roughness: 0.15,
        metalness: 0.95,
        previewColor: '#db9284'
      }
    ],
    modelType: 'ring',
    modelScale: 1.4,
    accentColor: '#f0e6d2'
  },
  {
    id: 'spectre-optique',
    code: 'OP-2026-009',
    name: 'Spectre Frame 01',
    frenchName: 'Lunettes Spectre Édition Limitée',
    subtitle: 'Sculpted Japanese Titanium & Polarized Crystal',
    category: 'optique',
    price: 3200,
    edition: 'LIMITED',
    limitedCount: 50,
    featured: false,
    description: 'Ultra-lightweight Japanese beta-titanium sunglasses with hand-milled bevel edges and custom dark-gradient Zeiss mineral glass lenses.',
    craftsmanship: 'Handcrafted in Sabae, Japan through a 300-step manufacturing process over six months.',
    origin: 'Sabae, Fukui, Japan',
    dimensions: 'Lens 52mm - Bridge 20mm - Temple 145mm',
    weight: '22g',
    details: [
      '100% Japanese Pure Beta-Titanium frame',
      'Zeiss Anti-Reflective Mineral Glass lenses with 100% UV400',
      'Custom screwless tension hinge system',
      'Engraved limited edition serial number',
      'Includes handcrafted leather folding hardcase'
    ],
    variants: [
      {
        id: 'v-titanium-black',
        name: 'Matte Gunmetal',
        colorHex: '#252528',
        materialName: 'Anodized Dark Titanium',
        roughness: 0.3,
        metalness: 0.9,
        previewColor: '#2f2f33'
      },
      {
        id: 'v-gold-wire',
        name: 'Polished Gold',
        colorHex: '#d8b450',
        materialName: '24k Gold Ion-Plated Titanium',
        roughness: 0.1,
        metalness: 0.98,
        previewColor: '#d1a83c'
      }
    ],
    modelType: 'sunglasses',
    modelScale: 1.25,
    accentColor: '#d8b450'
  },
  {
    id: 'monolithe-tourbillon',
    code: 'HA-2026-012',
    name: 'Monolithe Concept',
    frenchName: 'Le Monolithe Horlogerie Concept',
    subtitle: 'Saphir Crystal Monobloc Case & Perpetual Calendar',
    category: 'horlogerie',
    price: 125000,
    edition: 'ARCHIVE',
    featured: false,
    description: 'Carved from a single solid block of synthetic sapphire crystal. Entirely transparent housing exposing the intricate perpetual calendar movement floating within.',
    craftsmanship: 'Carving a single sapphire case requires 1,200 hours of diamond-bit machining and ultrasonic polishing.',
    origin: 'Val-de-Travers, Switzerland',
    dimensions: '43mm Diameter x 12.8mm Thickness',
    weight: '92g',
    details: [
      'Single-block Sapphire Crystal case and caseback',
      'Perpetual Calendar with Moonphase indicator',
      'Solid Gold rotor with hand guilloché finishing',
      'White rubberized alligator hybrid strap',
      'Limited to 5 pieces worldwide'
    ],
    variants: [
      {
        id: 'v-sapphire-clear',
        name: 'Crystal Clear',
        colorHex: '#f0f4f8',
        materialName: 'Pure Synthetic Sapphire Glass',
        roughness: 0.05,
        metalness: 0.1,
        previewColor: '#dbe3ed'
      }
    ],
    modelType: 'watch',
    modelScale: 1.2,
    accentColor: '#93c5fd'
  }
];

export const COLLECTIONS = [
  { id: 'NEW OBJECTS', label: '01 NEW OBJECTS', subtitle: 'Autumn / Winter Atelier Arrivals' },
  { id: 'ICONS', label: '02 ICONS', subtitle: 'Permanent Signature Creations' },
  { id: 'LIMITED', label: '03 LIMITED', subtitle: 'Numbered Bespoke Editions' },
  { id: 'ARCHIVE', label: '04 ARCHIVE', subtitle: 'Historical Runway & Museum Pieces' },
] as const;
