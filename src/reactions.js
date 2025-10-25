export const reactions = {
  'H2O': { 
    name: 'Su',
    elements: ['H', 'H', 'O'],
    color: '#3B82F6',
    effect: 'bubbles',
    description: 'Hayat için gerekli!',
    points: 100
  },
  'CO2': {
    name: 'Karbondioksit',
    elements: ['C', 'O', 'O'],
    color: '#6B7280',
    effect: 'smoke',
    description: 'Bitkiler bunu soluyor!',
    points: 150
  },
  'NH3': {
    name: 'Amonyak',
    elements: ['N', 'H', 'H', 'H'],
    color: '#8B5CF6',
    effect: 'vapour',
    description: 'Keskin kokulu!',
    points: 200
  },
  'NaCl': {
    name: 'Tuz',
    elements: ['Na', 'Cl'],
    color: '#F3F4F6',
    effect: 'sparkle',
    description: 'Sofra tuzu!',
    points: 120
  },
  'H2SO4': {
    name: 'Sülfürik Asit',
    elements: ['H', 'H', 'S', 'O', 'O', 'O', 'O'],
    color: '#EF4444',
    effect: 'dangerous',
    description: 'Tehlikeli asit!',
    points: 300
  },
  'CaCO3': {
    name: 'Kalsiyum Karbonat',
    elements: ['Ca', 'C', 'O', 'O', 'O'],
    color: '#E5E7EB',
    effect: 'crystallize',
    description: 'Tebeşir ve kireçtaşı!',
    points: 250
  },
  'CH3COOH': {
    name: 'Asetik Asit (Sirke)',
    elements: ['C', 'H', 'H', 'H', 'C', 'O', 'O', 'H'],
    color: '#F59E0B',
    effect: 'vapour',
    description: 'Sirkenin ekşi tadı!',
    points: 350
  }
};

// Başlangıç elementleri
export const defaultElements = [
  { symbol: 'H', name: 'Hidrojen', atomicNumber: 1, color: '#FFFFFF', textColor: '#3B82F6' },
  { symbol: 'O', name: 'Oksijen', atomicNumber: 8, color: '#BFDBFE', textColor: '#1E40AF' },
  { symbol: 'C', name: 'Karbon', atomicNumber: 6, color: '#9CA3AF', textColor: '#111827' },
  { symbol: 'N', name: 'Azot', atomicNumber: 7, color: '#C4B5FD', textColor: '#5B21B6' },
  { symbol: 'Na', name: 'Sodyum', atomicNumber: 11, color: '#FED7AA', textColor: '#9A3412' },
  { symbol: 'Cl', name: 'Klor', atomicNumber: 17, color: '#86EFAC', textColor: '#14532D' },
  { symbol: 'S', name: 'Sülfür', atomicNumber: 16, color: '#FEF08A', textColor: '#713F12' },
  { symbol: 'Ca', name: 'Kalsiyum', atomicNumber: 20, color: '#E5E7EB', textColor: '#374151' }
];

// Tüm periyodik tablo elementleri (İlk 20)
export const allPeriodicElements = [
  // 1. Periyot
  { symbol: 'H', name: 'Hidrojen', atomicNumber: 1, mass: 1.008, color: '#FFFFFF', textColor: '#3B82F6', category: 'nonmetal' },
  { symbol: 'He', name: 'Helyum', atomicNumber: 2, mass: 4.003, color: '#D9FFFF', textColor: '#0891B2', category: 'noble-gas' },
  
  // 2. Periyot
  { symbol: 'Li', name: 'Lityum', atomicNumber: 3, mass: 6.941, color: '#CC80FF', textColor: '#6B21A8', category: 'alkali-metal' },
  { symbol: 'Be', name: 'Berilyum', atomicNumber: 4, mass: 9.012, color: '#C2FF00', textColor: '#3F6212', category: 'alkaline-earth' },
  { symbol: 'B', name: 'Bor', atomicNumber: 5, mass: 10.81, color: '#FFB5B5', textColor: '#991B1B', category: 'metalloid' },
  { symbol: 'C', name: 'Karbon', atomicNumber: 6, mass: 12.01, color: '#9CA3AF', textColor: '#111827', category: 'nonmetal' },
  { symbol: 'N', name: 'Azot', atomicNumber: 7, mass: 14.01, color: '#C4B5FD', textColor: '#5B21B6', category: 'nonmetal' },
  { symbol: 'O', name: 'Oksijen', atomicNumber: 8, mass: 16.00, color: '#BFDBFE', textColor: '#1E40AF', category: 'nonmetal' },
  { symbol: 'F', name: 'Flor', atomicNumber: 9, mass: 19.00, color: '#90EE90', textColor: '#14532D', category: 'halogen' },
  { symbol: 'Ne', name: 'Neon', atomicNumber: 10, mass: 20.18, color: '#B3E5FC', textColor: '#0C4A6E', category: 'noble-gas' },
  
  // 3. Periyot
  { symbol: 'Na', name: 'Sodyum', atomicNumber: 11, mass: 22.99, color: '#FED7AA', textColor: '#9A3412', category: 'alkali-metal' },
  { symbol: 'Mg', name: 'Magnezyum', atomicNumber: 12, mass: 24.31, color: '#8AFF00', textColor: '#365314', category: 'alkaline-earth' },
  { symbol: 'Al', name: 'Alüminyum', atomicNumber: 13, mass: 26.98, color: '#BFA6A6', textColor: '#78350F', category: 'post-transition' },
  { symbol: 'Si', name: 'Silisyum', atomicNumber: 14, mass: 28.09, color: '#F0C8A0', textColor: '#92400E', category: 'metalloid' },
  { symbol: 'P', name: 'Fosfor', atomicNumber: 15, mass: 30.97, color: '#FF8000', textColor: '#FFFFFF', category: 'nonmetal' },
  { symbol: 'S', name: 'Sülfür', atomicNumber: 16, mass: 32.07, color: '#FEF08A', textColor: '#713F12', category: 'nonmetal' },
  { symbol: 'Cl', name: 'Klor', atomicNumber: 17, mass: 35.45, color: '#86EFAC', textColor: '#14532D', category: 'halogen' },
  { symbol: 'Ar', name: 'Argon', atomicNumber: 18, mass: 39.95, color: '#80D4FF', textColor: '#0C4A6E', category: 'noble-gas' },
  
  // 4. Periyot (İlk kısmı)
  { symbol: 'K', name: 'Potasyum', atomicNumber: 19, mass: 39.10, color: '#8F40D4', textColor: '#FFFFFF', category: 'alkali-metal' },
  { symbol: 'Ca', name: 'Kalsiyum', atomicNumber: 20, mass: 40.08, color: '#E5E7EB', textColor: '#374151', category: 'alkaline-earth' },
];

