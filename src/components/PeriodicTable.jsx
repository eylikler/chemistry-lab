import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { getUsableElements, elementRestrictions } from '../reactions';

const PeriodicTable = ({ isOpen, onClose, availableElements, allElements, onToggleElement }) => {
  // Kullanılabilir elementler
  const usableElements = getUsableElements();
  

  // Grid pozisyonları
  const gridPositions = {
    'H': { group: 1, period: 1 },
    'He': { group: 18, period: 1 },
    'C': { group: 14, period: 2 },
    'N': { group: 15, period: 2 },
    'O': { group: 16, period: 2 },
    'F': { group: 17, period: 2 },
    'Ne': { group: 18, period: 2 },
    'Na': { group: 1, period: 3 },
    'Mg': { group: 2, period: 3 },
    'Al': { group: 13, period: 3 },
    'Si': { group: 14, period: 3 },
    'P': { group: 15, period: 3 },
    'S': { group: 16, period: 3 },
    'Cl': { group: 17, period: 3 },
    'Ar': { group: 18, period: 3 },
    'K': { group: 1, period: 4 },
    'Ca': { group: 2, period: 4 },
    'Fe': { group: 8, period: 4 },
    'Cu': { group: 11, period: 4 },
    'Zn': { group: 12, period: 4 },
    'Br': { group: 17, period: 4 },
    'Ag': { group: 11, period: 5 },
  };

  // Ana ekranda olup olmadığını kontrol et
  const isAvailable = (symbol) => {
    return availableElements.some(el => el.symbol === symbol);
  };

  // Element kullanılabilir mi kontrol et
  const isUsable = (symbol) => {
    return usableElements.includes(symbol);
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
    'transition-metal': '#ef4444',
  };

  const categoryNames = {
    'nonmetal': 'Ametal',
    'noble-gas': 'Soy Gaz',
    'alkali-metal': 'Alkali Metal',
    'alkaline-earth': 'Toprak Alkali',
    'metalloid': 'Yarı Metal',
    'halogen': 'Halojen',
    'post-transition': 'Geçiş Sonrası',
    'transition-metal': 'Geçiş Metali',
  };

  // Grid pozisyonu hesapla
  const getGridPosition = (symbol) => {
    const pos = gridPositions[symbol];
    return {
      gridColumn: pos.group,
      gridRow: pos.period,
    };
  };

  // Element tıklama işlemi
  const handleElementClick = (element) => {
    // Kullanılabilir element mi kontrol et
    if (!isUsable(element.symbol)) {
      // Kısıtlama nedeni varsa göster
      const reason = elementRestrictions[element.symbol];
      toast.error(
        <div>
          <strong>❌ {element.name} eklenemez!</strong>
          <br />
          <span style={{ fontSize: '0.9rem' }}>{reason}</span>
        </div>,
        {
          duration: 5000,
          style: {
            background: '#FEE2E2',
            color: '#991B1B',
            border: '2px solid #DC2626',
          },
        }
      );
      return;
    }

    // Kullanılabilir elementse ekle/çıkar
    onToggleElement(element);
    
    // Başarı mesajı
    if (isAvailable(element.symbol)) {
      toast.success(`${element.name} ana ekrandan çıkarıldı!`, {
        icon: '➖',
        duration: 2000,
      });
    } else {
      toast.success(`${element.name} ana ekrana eklendi!`, {
        icon: '➕',
        duration: 2000,
      });
    }
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
              <p>
                <strong>Tıklayarak elementleri ekleyin/çıkarın!</strong><br/>
                <span className="available-indicator">✅</span> Ana ekranda mevcut | 
                <span className="unavailable-indicator">➕</span> Tıklayarak ekleyin | 
                <span className="disabled-indicator">🚫</span> Kullanılamaz
              </p>
            </div>

            {/* Periyodik Tablo Grid */}
            <div className="periodic-table-grid">
              {allElements.map((element) => {
                const usable = isUsable(element.symbol);
                const available = isAvailable(element.symbol);
                
                return (
                  <motion.div
                    key={element.symbol}
                    className={`periodic-element ${
                      !usable ? 'disabled-element' : 
                      available ? 'available-element' : 
                      'unavailable-element'
                    }`}
                    style={{
                      ...getGridPosition(element.symbol),
                      backgroundColor: usable ? element.color : '#D1D5DB',
                      borderColor: usable ? categoryColors[element.category] : '#9CA3AF',
                      opacity: usable ? 1 : 0.5,
                      cursor: usable ? 'pointer' : 'not-allowed',
                    }}
                    whileHover={usable ? { scale: 1.1, zIndex: 10 } : { scale: 1.05 }}
                    whileTap={usable ? { scale: 0.95 } : {}}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: usable ? 1 : 0.5, scale: 1 }}
                    transition={{ delay: element.atomicNumber * 0.02 }}
                    onClick={() => handleElementClick(element)}
                  >
                    <span className="element-status">
                      {!usable ? '🚫' : available ? '✅' : '➕'}
                    </span>
                    <div className="element-number">{element.atomicNumber}</div>
                    <div className="element-symbol-large">{element.symbol}</div>
                    <div className="element-name-small">{element.name}</div>
                    <div className="element-mass">{element.mass}</div>
                  </motion.div>
                );
              })}
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

