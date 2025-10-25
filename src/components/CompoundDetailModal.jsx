import { motion, AnimatePresence } from 'framer-motion';

const CompoundDetailModal = ({ compound, isOpen, onClose }) => {
  if (!compound) return null;

  // Her bileşik için detaylı kullanım alanları
  const compoundDetails = {
    'H2O': {
      uses: [
        '💧 İnsan vücudunun %70\'i sudan oluşur',
        '🌱 Tüm canlıların yaşamı için vazgeçilmez',
        '🏭 Sanayide çözücü ve soğutucu olarak kullanılır'
      ],
      properties: 'Renksiz, kokusuz, tatsız sıvı. 0°C\'de donar, 100°C\'de kaynar.',
      funFact: '🎯 Eğlenceli Bilgi: Dünya yüzeyinin %71\'i su ile kaplıdır!'
    },
    'CO2': {
      uses: [
        '🌿 Bitkiler fotosentez için CO₂ kullanır',
        '🥤 Gazlı içeceklerde köpük oluşturmak için',
        '🧯 Yangın söndürücülerde kullanılır'
      ],
      properties: 'Renksiz gaz. Havadan ağırdır. Suda az çözünür.',
      funFact: '🎯 Eğlenceli Bilgi: Nefes verirken CO₂ üretiyoruz!'
    },
    'NH3': {
      uses: [
        '🌾 Tarımda gübre üretiminde kullanılır',
        '🧼 Temizlik ürünlerinde bulunur',
        '❄️ Soğutma sistemlerinde soğutucu akışkan olarak'
      ],
      properties: 'Keskin kokulu gaz. Suda çok iyi çözünür. Bazik özellik gösterir.',
      funFact: '🎯 Eğlenceli Bilgi: İçi rahatlatıcı tuzlarda NH₃ vardır!'
    },
    'NaCl': {
      uses: [
        '🍽️ Yemeklerde baharat olarak kullanılır',
        '🧂 Gıda muhafazasında tuzlama için',
        '❄️ Kış aylarında buzlanmayı önlemek için yollara serpilir'
      ],
      properties: 'Beyaz kristal toz. Suda kolayca çözünür. Tuzlu tat verir.',
      funFact: '🎯 Eğlenceli Bilgi: Vücudumuz çalışmak için tuza ihtiyaç duyar!'
    },
    'H2SO4': {
      uses: [
        '🔋 Araç akülerinde elektrolit olarak',
        '🏭 Gübre ve patlayıcı üretiminde',
        '⚗️ Kimya laboratuvarlarında asit olarak'
      ],
      properties: 'Renksiz, yoğun sıvı. Çok güçlü asit. Suyla karıştırılırken çok ısı açığa çıkar.',
      funFact: '🎯 Eğlenceli Bilgi: En çok üretilen kimyasal maddelerden biridir!'
    },
    'CaCO3': {
      uses: [
        '🏗️ İnşaat sektöründe çimento ve kireç yapımında',
        '✏️ Tebeşir üretiminde kullanılır',
        '💊 İlaç sanayinde kalsiyum takviyesi olarak'
      ],
      properties: 'Beyaz toz. Suda çok az çözünür. Doğada kireçtaşı ve mermer olarak bulunur.',
      funFact: '🎯 Eğlenceli Bilgi: Yumurta kabuğu CaCO₃\'tan oluşur!'
    },
    'CH3COOH': {
      uses: [
        '🥗 Sirke olarak mutfakta kullanılır',
        '🧪 Gıda koruyucusu ve tatlandırıcı',
        '🏭 Plastik ve boya üretiminde çözücü olarak'
      ],
      properties: 'Keskin kokulu renksiz sıvı. Ekşi tat verir. Suda çözünür.',
      funFact: '🎯 Eğlenceli Bilgi: Sirke %4-8 asetik asit içerir!'
    },
    'C2H5OH': {
      uses: [
        '🍷 Alkollü içeceklerin ana bileşeni',
        '🧴 Dezenfektan ve antiseptik olarak',
        '⛽ Yakıt katkı maddesi (bioethanol)'
      ],
      properties: 'Renksiz, uçucu sıvı. Karakteristik koku. Suda karışır.',
      funFact: '🎯 Eğlenceli Bilgi: Şarap mayalanmasıyla doğal olarak üretilir!'
    },
    'CH4': {
      uses: [
        '🔥 Doğalgaz olarak ısınma ve pişirmede',
        '⚡ Elektrik üretiminde yakıt olarak',
        '🏭 Hidrojen üretiminde hammadde olarak'
      ],
      properties: 'Renksiz, kokusuz gaz. Havadan hafiftir. Kolay tutuşur.',
      funFact: '🎯 Eğlenceli Bilgi: İnekler metan gazı üretir!'
    },
    'HCl': {
      uses: [
        '🏭 Metal yüzey temizliğinde (paslanma giderici)',
        '🧪 Kimya laboratuvarlarında pH ayarlamada',
        '💊 Mide asidinin ana bileşeni'
      ],
      properties: 'Renksiz, keskin kokulu gaz. Suda çok iyi çözünür. Güçlü asit.',
      funFact: '🎯 Eğlenceli Bilgi: Midemiz yemek sindirmek için HCl üretir!'
    },
    'NO2': {
      uses: [
        '🏭 Nitrik asit üretiminde hammadde',
        '🚗 Araç egzoz gazlarında bulunur',
        '⚗️ Kimya sentezlerinde oksitleyici olarak'
      ],
      properties: 'Kahverengi-kırmızımsı gaz. Keskin koku. Zehirlidir.',
      funFact: '🎯 Eğlenceli Bilgi: Hava kirliliğinin göstergesidir!'
    },
    'NaOH': {
      uses: [
        '🧼 Sabun ve deterjan üretiminde',
        '📄 Kağıt sanayinde hamur yapımında',
        '🏭 Kimya endüstrisinde pH ayarlamada'
      ],
      properties: 'Beyaz katı. Suda çözünürken çok ısı verir. Güçlü baz.',
      funFact: '🎯 Eğlenceli Bilgi: "Kostik soda" olarak bilinir!'
    },
    'MgO': {
      uses: [
        '🧱 Ateşe dayanıklı tuğla yapımında',
        '💊 Mide ilacı olarak (mide ekşimesinde)',
        '🏭 Çelik üretiminde katkı maddesi'
      ],
      properties: 'Beyaz kristal toz. Yüksek erime noktası. Suda az çözünür.',
      funFact: '🎯 Eğlenceli Bilgi: Magnezyum yanarken parlak beyaz ışık çıkarır!'
    },
    'C6H12O6': {
      uses: [
        '⚡ Vücudumuzun enerji kaynağı',
        '🏃 Sporcular için enerji içeceğinde',
        '💉 Hastanelerde serum olarak'
      ],
      properties: 'Beyaz kristal toz. Tatlı. Suda çok iyi çözünür.',
      funFact: '🎯 Eğlenceli Bilgi: Beynimiz günde 120g glikoz tüketir!'
    }
  };

  const details = compoundDetails[compound.formula] || {
    uses: ['Bilgi yükleniyor...'],
    properties: 'Detaylar hazırlanıyor.',
    funFact: '🎯 Yakında eklenecek!'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="compound-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="compound-modal"
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Başlık */}
            <div className="compound-modal-header">
              <div className="compound-modal-title-section">
                <div
                  className="compound-modal-color"
                  style={{ backgroundColor: compound.color }}
                />
                <div>
                  <h2 className="compound-modal-formula">{compound.formula}</h2>
                  <h3 className="compound-modal-name">{compound.name}</h3>
                </div>
              </div>
              <button className="compound-modal-close" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* İçerik */}
            <div className="compound-modal-body">
              {/* Açıklama */}
              <motion.div
                className="compound-modal-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="compound-modal-description">
                  <span className="description-icon">📝</span>
                  {compound.description}
                </div>
              </motion.div>

              {/* Kullanım Alanları */}
              <motion.div
                className="compound-modal-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="section-heading">🔬 Kullanım Alanları</h4>
                <ul className="uses-list">
                  {details.uses.map((use, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {use}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Özellikler */}
              <motion.div
                className="compound-modal-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="section-heading">⚗️ Kimyasal Özellikler</h4>
                <p className="properties-text">{details.properties}</p>
              </motion.div>

              {/* Eğlenceli Bilgi */}
              <motion.div
                className="compound-modal-section fun-fact"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p>{details.funFact}</p>
              </motion.div>

              {/* Puan */}
              <motion.div
                className="compound-modal-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="points-display">
                  🏆 <strong>{compound.points}</strong> puan değerinde!
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompoundDetailModal;

