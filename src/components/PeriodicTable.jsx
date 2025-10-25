import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getUsableElements, elementRestrictions } from '../reactions';

const PeriodicTable = ({ isOpen, onClose, availableElements, allElements, onToggleElement }) => {
  // Kullanılabilir elementler
  const usableElements = getUsableElements();
  
  // Sayfa durumu
  const [currentPage, setCurrentPage] = useState(1);
  // Sayfa 1: İlk 3 periyot + 4. periyodun ilk kısmı
  const page1Elements = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 
                         'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar',
                         'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe'];
  
  // Sayfa 2: 4. periyodun geri kalanı
  const page2Elements = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
                         'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar',
                         'K', 'Ca', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'];
  
  // Mevcut sayfaya göre gösterilecek elementler
  const visibleElements = currentPage === 1 
    ? allElements.filter(el => page1Elements.includes(el.symbol))
    : allElements.filter(el => page2Elements.includes(el.symbol));

  // Grid pozisyonları için periyot ve grup bilgileri
  const gridPositions = {
    'H': { group: 1, period: 1 },
    'He': { group: 18, period: 1 },
    'Li': { group: 1, period: 2 },
    'Be': { group: 2, period: 2 },
    'B': { group: 13, period: 2 },
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
    'Sc': { group: 3, period: 4 },
    'Ti': { group: 4, period: 4 },
    'V': { group: 5, period: 4 },
    'Cr': { group: 6, period: 4 },
    'Mn': { group: 7, period: 4 },
    'Fe': { group: 8, period: 4 },
    'Co': { group: 9, period: 4 },
    'Ni': { group: 10, period: 4 },
    'Cu': { group: 11, period: 4 },
    'Zn': { group: 12, period: 4 },
    'Ga': { group: 13, period: 4 },
    'Ge': { group: 14, period: 4 },
    'As': { group: 15, period: 4 },
    'Se': { group: 16, period: 4 },
    'Br': { group: 17, period: 4 },
    'Kr': { group: 18, period: 4 },
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
              {visibleElements.map((element) => {
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

            {/* Sayfalama Butonları */}
            <div className="pagination-controls">
              <button
                className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                className={`page-btn ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <span className="page-info">
                {currentPage === 1 ? 'İlk 3 Periyot + Geçiş Metali' : '4. Periyot Devamı'}
              </span>
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

