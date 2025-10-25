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
  },
  'C2H5OH': {
    name: 'Etanol (Alkol)',
    elements: ['C', 'C', 'H', 'H', 'H', 'H', 'H', 'O', 'H'],
    color: '#06B6D4',
    effect: 'bubbles',
    description: 'Alkollü içeceklerde bulunan!',
    points: 400
  },
  'CH4': {
    name: 'Metan (Doğalgaz)',
    elements: ['C', 'H', 'H', 'H', 'H'],
    color: '#84CC16',
    effect: 'smoke',
    description: 'Doğalgazın ana bileşeni!',
    points: 180
  },
  'HCl': {
    name: 'Hidroklorik Asit',
    elements: ['H', 'Cl'],
    color: '#EAB308',
    effect: 'vapour',
    description: 'Kuvvetli asit!',
    points: 150
  },
  'NO2': {
    name: 'Azot Dioksit',
    elements: ['N', 'O', 'O'],
    color: '#DC2626',
    effect: 'dangerous',
    description: 'Kahverengi zehirli gaz!',
    points: 220
  },
  'NaOH': {
    name: 'Sodyum Hidroksit (Kostik)',
    elements: ['Na', 'O', 'H'],
    color: '#F97316',
    effect: 'crystallize',
    description: 'Güçlü baz, sabun yapımında!',
    points: 200
  },
  'MgO': {
    name: 'Magnezyum Oksit',
    elements: ['Mg', 'O'],
    color: '#F3F4F6',
    effect: 'sparkle',
    description: 'Beyaz parlak toz!',
    points: 170
  },
  'C6H12O6': {
    name: 'Glikoz (Şeker)',
    elements: ['C', 'C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'O', 'O', 'O', 'O', 'O', 'O'],
    color: '#FDE047',
    effect: 'crystallize',
    description: 'Enerji kaynağımız!',
    points: 500
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
  
  // 4. Periyot
  { symbol: 'K', name: 'Potasyum', atomicNumber: 19, mass: 39.10, color: '#8F40D4', textColor: '#FFFFFF', category: 'alkali-metal' },
  { symbol: 'Ca', name: 'Kalsiyum', atomicNumber: 20, mass: 40.08, color: '#E5E7EB', textColor: '#374151', category: 'alkaline-earth' },
  { symbol: 'Sc', name: 'Skandiyum', atomicNumber: 21, mass: 44.96, color: '#E0E0E0', textColor: '#1F2937', category: 'transition-metal' },
  { symbol: 'Ti', name: 'Titanyum', atomicNumber: 22, mass: 47.87, color: '#BFC2C7', textColor: '#1F2937', category: 'transition-metal' },
  { symbol: 'V', name: 'Vanadyum', atomicNumber: 23, mass: 50.94, color: '#A6A6AB', textColor: '#FFFFFF', category: 'transition-metal' },
  { symbol: 'Cr', name: 'Krom', atomicNumber: 24, mass: 52.00, color: '#8A99C7', textColor: '#FFFFFF', category: 'transition-metal' },
  { symbol: 'Mn', name: 'Manganez', atomicNumber: 25, mass: 54.94, color: '#9C7AC7', textColor: '#FFFFFF', category: 'transition-metal' },
  { symbol: 'Fe', name: 'Demir', atomicNumber: 26, mass: 55.85, color: '#E06633', textColor: '#FFFFFF', category: 'transition-metal' },
  { symbol: 'Co', name: 'Kobalt', atomicNumber: 27, mass: 58.93, color: '#F090A0', textColor: '#1F2937', category: 'transition-metal' },
  { symbol: 'Ni', name: 'Nikel', atomicNumber: 28, mass: 58.69, color: '#50D050', textColor: '#1F2937', category: 'transition-metal' },
  { symbol: 'Cu', name: 'Bakır', atomicNumber: 29, mass: 63.55, color: '#C88033', textColor: '#FFFFFF', category: 'transition-metal' },
  { symbol: 'Zn', name: 'Çinko', atomicNumber: 30, mass: 65.38, color: '#7D80B0', textColor: '#FFFFFF', category: 'transition-metal' },
  { symbol: 'Ga', name: 'Galyum', atomicNumber: 31, mass: 69.72, color: '#C28F8F', textColor: '#1F2937', category: 'post-transition' },
  { symbol: 'Ge', name: 'Germanyum', atomicNumber: 32, mass: 72.63, color: '#668F8F', textColor: '#FFFFFF', category: 'metalloid' },
  { symbol: 'As', name: 'Arsenik', atomicNumber: 33, mass: 74.92, color: '#BD80E3', textColor: '#1F2937', category: 'metalloid' },
  { symbol: 'Se', name: 'Selenyum', atomicNumber: 34, mass: 78.97, color: '#FFA100', textColor: '#1F2937', category: 'nonmetal' },
  { symbol: 'Br', name: 'Brom', atomicNumber: 35, mass: 79.90, color: '#A62929', textColor: '#FFFFFF', category: 'halogen' },
  { symbol: 'Kr', name: 'Kripton', atomicNumber: 36, mass: 83.80, color: '#5CB8D1', textColor: '#1F2937', category: 'noble-gas' },
];

// Reaksiyonlarda kullanılan elementleri otomatik topla
export const getUsableElements = () => {
  const usedElements = new Set();
  Object.values(reactions).forEach(reaction => {
    reaction.elements.forEach(element => {
      usedElements.add(element);
    });
  });
  return Array.from(usedElements);
};

// Element eklenememe nedenleri (eğitici açıklamalar)
export const elementRestrictions = {
  'He': 'Helyum soy gazdır ve başka elementlerle bileşik oluşturmaz. Elektron kabukları tamamen doludur.',
  'Ne': 'Neon soy gazdır ve kimyasal reaksiyona girmez. Doğada tek başına bulunur.',
  'Ar': 'Argon soy gazdır ve diğer elementlerle tepkime vermez. Çok kararlı bir yapıya sahiptir.',
  'Kr': 'Kripton soy gazdır ve kimyasal olarak inert (etkisiz) bir elementtir.',
  'Li': 'Lityum çok reaktiftir ve su ile patlayıcı reaksiyon verir. Güvenlik nedeniyle henüz desteklenmiyor.',
  'Be': 'Berilyum ve bileşikleri zehirlidir. Sağlık riski nedeniyle şu an için desteklenmiyor.',
  'B': 'Bor ile bilinen bileşikler (borik asit gibi) henüz veritabanına eklenmedi.',
  'F': 'Flor en reaktif elementtir ve çok tehlikelidir. Güvenlik nedeniyle devre dışı bırakıldı.',
  'Al': 'Alüminyum reaksiyonları (Al₂O₃ gibi) gelecek güncellemelerde eklenecek.',
  'Si': 'Silisyum bileşikleri (SiO₂ gibi) henüz desteklenmiyor. Yakında eklenecek.',
  'P': 'Fosfor çok reaktiftir ve kendiliğinden yanabilir. Güvenlik nedeniyle beklemede.',
  'K': 'Potasyum su ile patlayıcı reaksiyon verir ve alev alır. Çok tehlikelidir.',
  'Sc': 'Skandiyum nadir bir geçiş metalidir. Bileşikleri henüz veritabanına eklenmedi.',
  'Ti': 'Titanyum reaksiyonları (TiO₂ gibi) gelecek güncellemelerde eklenecek.',
  'V': 'Vanadyum endüstriyel kullanımlıdır. Eğitim amaçlı reaksiyonları henüz yok.',
  'Cr': 'Krom bileşikleri (K₂Cr₂O₇ gibi) gelişmiş seviye olduğu için beklemede.',
  'Mn': 'Manganez oksitleyicidir. Güvenlik nedeniyle henüz eklenmedi.',
  'Fe': 'Demir bileşikleri (Fe₂O₃ gibi) çok yaygın! Yakında eklenecek.',
  'Co': 'Kobalt nadir bir elementtir ve bileşikleri henüz desteklenmiyor.',
  'Ni': 'Nikel alerjik reaksiyonlara neden olabilir. Güvenlik nedeniyle beklemede.',
  'Cu': 'Bakır bileşikleri (CuSO₄ gibi) güzel! Gelecek güncellemelerde eklenecek.',
  'Zn': 'Çinko bileşikleri (ZnO gibi) sağlıklı! Yakında eklenecek.',
  'Ga': 'Galyum metal olmasına rağmen el sıcaklığında erir. Henüz desteklenmiyor.',
  'Ge': 'Germanyum yarı iletkendir. Elektronik amaçlı kullanılır, reaksiyonları yok.',
  'As': 'Arsenik ZEHİRLİDİR! Sağlık riski nedeniyle kesinlikle devre dışı.',
  'Se': 'Selenyum az miktarda faydalı ama çok zehirlidir. Güvenlik nedeniyle yok.',
  'Br': 'Brom sıvı bir haloj endir ve çok tehlikelidir. Yakıcı buharı vardır.',
};

// Toplam bileşik sayısını hesapla
export const getTotalCompounds = () => Object.keys(reactions).length;

