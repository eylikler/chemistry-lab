import { motion, AnimatePresence } from 'framer-motion';

const PeriodicTable = ({ isOpen, onClose, elements }) => {
  // Periyodik tablo verileri - İlk 20 element
  const periodicElements = [
    // 1. Periyot
    { symbol: 'H', name: 'Hidrojen', number: 1, mass: 1.008, group: 1, period: 1, category: 'nonmetal', color: '#FFFFFF' },
    { symbol: 'He', name: 'Helyum', number: 2, mass: 4.003, group: 18, period: 1, category: 'noble-gas', color: '#D9FFFF' },
    
    // 2. Periyot
    { symbol: 'Li', name: 'Lityum', number: 3, mass: 6.941, group: 1, period: 2, category: 'alkali-metal', color: '#CC80FF' },
    { symbol: 'Be', name: 'Berilyum', number: 4, mass: 9.012, group: 2, period: 2, category: 'alkaline-earth', color: '#C2FF00' },
    { symbol: 'B', name: 'Bor', number: 5, mass: 10.81, group: 13, period: 2, category: 'metalloid', color: '#FFB5B5' },
    { symbol: 'C', name: 'Karbon', number: 6, mass: 12.01, group: 14, period: 2, category: 'nonmetal', color: '#9CA3AF' },
    { symbol: 'N', name: 'Azot', number: 7, mass: 14.01, group: 15, period: 2, category: 'nonmetal', color: '#C4B5FD' },
    { symbol: 'O', name: 'Oksijen', number: 8, mass: 16.00, group: 16, period: 2, category: 'nonmetal', color: '#BFDBFE' },
    { symbol: 'F', name: 'Flor', number: 9, mass: 19.00, group: 17, period: 2, category: 'halogen', color: '#90EE90' },
    { symbol: 'Ne', name: 'Neon', number: 10, mass: 20.18, group: 18, period: 2, category: 'noble-gas', color: '#B3E5FC' },
    
    // 3. Periyot
    { symbol: 'Na', name: 'Sodyum', number: 11, mass: 22.99, group: 1, period: 3, category: 'alkali-metal', color: '#FED7AA' },
    { symbol: 'Mg', name: 'Magnezyum', number: 12, mass: 24.31, group: 2, period: 3, category: 'alkaline-earth', color: '#8AFF00' },
    { symbol: 'Al', name: 'Alüminyum', number: 13, mass: 26.98, group: 13, period: 3, category: 'post-transition', color: '#BFA6A6' },
    { symbol: 'Si', name: 'Silisyum', number: 14, mass: 28.09, group: 14, period: 3, category: 'metalloid', color: '#F0C8A0' },
    { symbol: 'P', name: 'Fosfor', number: 15, mass: 30.97, group: 15, period: 3, category: 'nonmetal', color: '#FF8000' },
    { symbol: 'S', name: 'Sülfür', number: 16, mass: 32.07, group: 16, period: 3, category: 'nonmetal', color: '#FEF08A' },
    { symbol: 'Cl', name: 'Klor', number: 17, mass: 35.45, group: 17, period: 3, category: 'halogen', color: '#86EFAC' },
    { symbol: 'Ar', name: 'Argon', number: 18, mass: 39.95, group: 18, period: 3, category: 'noble-gas', color: '#80D4FF' },
    
    // 4. Periyot (İlk kısmı)
    { symbol: 'K', name: 'Potasyum', number: 19, mass: 39.10, group: 1, period: 4, category: 'alkali-metal', color: '#8F40D4' },
    { symbol: 'Ca', name: 'Kalsiyum', number: 20, mass: 40.08, group: 2, period: 4, category: 'alkaline-earth', color: '#E5E7EB' },
  ];

  // Oyunda kullanılan elementleri işaretle
  const isGameElement = (symbol) => {
    return elements.some(el => el.symbol === symbol);
  };

  // Kategori renkleri
  const categoryColors = {
    'nonmetal': '#667eea',
    'noble-gas': '#4ade80',
    'alkali-metal': '#f59e0b',
    'alkaline-earth': '#10b981',
    'metalloid': '#8b5cf6',
    'halogen': '#14b8a6',
    'post-transition': '#6366f1',
  };

  const categoryNames = {
    'nonmetal': 'Ametal',
    'noble-gas': 'Soy Gaz',
    'alkali-metal': 'Alkali Metal',
    'alkaline-earth': 'Toprak Alkali',
    'metalloid': 'Yarı Metal',
    'halogen': 'Halojen',
    'post-transition': 'Geçiş Sonrası',
  };

  // Grid pozisyonu hesapla
  const getGridPosition = (element) => {
    return {
      gridColumn: element.group,
      gridRow: element.period,
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="periodic-table-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="periodic-table-modal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Başlık */}
            <div className="periodic-table-header">
              <h2>⚛️ Periyodik Tablo</h2>
              <button className="close-btn" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* Açıklama */}
            <div className="periodic-table-info">
              <p>İlk 20 element gösterilmektedir. <span className="game-element-indicator">⭐</span> işareti oyunda kullanılan elementleri gösterir.</p>
            </div>

            {/* Periyodik Tablo Grid */}
            <div className="periodic-table-grid">
              {periodicElements.map((element) => (
                <motion.div
                  key={element.symbol}
                  className={`periodic-element ${isGameElement(element.symbol) ? 'game-element' : ''}`}
                  style={{
                    ...getGridPosition(element),
                    backgroundColor: element.color,
                    borderColor: categoryColors[element.category],
                  }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: element.number * 0.02 }}
                >
                  {isGameElement(element.symbol) && (
                    <span className="game-star">⭐</span>
                  )}
                  <div className="element-number">{element.number}</div>
                  <div className="element-symbol-large">{element.symbol}</div>
                  <div className="element-name-small">{element.name}</div>
                  <div className="element-mass">{element.mass}</div>
                </motion.div>
              ))}
            </div>

            {/* Kategori Lejantı */}
            <div className="periodic-table-legend">
              <h3>Element Kategorileri:</h3>
              <div className="legend-items">
                {Object.entries(categoryColors).map(([key, color]) => (
                  <div key={key} className="legend-item">
                    <div
                      className="legend-color"
                      style={{ backgroundColor: color }}
                    />
                    <span>{categoryNames[key]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bilgi Kutusu */}
            <div className="periodic-table-footer">
              <div className="info-box">
                <h4>📚 Bilgi:</h4>
                <ul>
                  <li><strong>Atom Numarası:</strong> Elementin proton sayısı</li>
                  <li><strong>Atom Kütlesi:</strong> Elementin ortalama kütlesi (amu)</li>
                  <li><strong>Periyot:</strong> Yatay satırlar</li>
                  <li><strong>Grup:</strong> Dikey sütunlar</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PeriodicTable;

