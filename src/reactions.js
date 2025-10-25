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
  }
};

// Element bilgileri
export const elements = [
  { symbol: 'H', name: 'Hidrojen', atomicNumber: 1, color: '#FFFFFF', textColor: '#3B82F6' },
  { symbol: 'O', name: 'Oksijen', atomicNumber: 8, color: '#BFDBFE', textColor: '#1E40AF' },
  { symbol: 'C', name: 'Karbon', atomicNumber: 6, color: '#9CA3AF', textColor: '#111827' },
  { symbol: 'N', name: 'Azot', atomicNumber: 7, color: '#C4B5FD', textColor: '#5B21B6' },
  { symbol: 'Na', name: 'Sodyum', atomicNumber: 11, color: '#FED7AA', textColor: '#9A3412' },
  { symbol: 'Cl', name: 'Klor', atomicNumber: 17, color: '#86EFAC', textColor: '#14532D' },
  { symbol: 'S', name: 'Sülfür', atomicNumber: 16, color: '#FEF08A', textColor: '#713F12' },
  { symbol: 'Ca', name: 'Kalsiyum', atomicNumber: 20, color: '#E5E7EB', textColor: '#374151' }
];

