import { motion, AnimatePresence } from 'framer-motion';

const ReactionDisplay = ({ discoveredCompounds }) => {
  return (
    <div className="reaction-display">
      <h3 className="section-title">
        🔬 Keşfedilen Bileşikler
        <span className="count-badge">{discoveredCompounds.length}/7</span>
      </h3>

      <div className="compounds-list">
        <AnimatePresence>
          {discoveredCompounds.length === 0 ? (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="empty-icon">🧪</div>
              <p>Henüz bileşik keşfetmediniz.</p>
              <p className="hint">Elementleri karıştırın!</p>
            </motion.div>
          ) : (
            discoveredCompounds.map((compound, index) => (
              <motion.div
                key={compound.formula}
                className="compound-card"
                initial={{ x: 300, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="compound-header">
                  <div
                    className="compound-color"
                    style={{ backgroundColor: compound.color }}
                  />
                  <div className="compound-formula">{compound.formula}</div>
                </div>
                <div className="compound-name">{compound.name}</div>
                <div className="compound-description">{compound.description}</div>
                <div className="compound-footer">
                  <span className="compound-effect">
                    {getEffectIcon(compound.effect)} {getEffectName(compound.effect)}
                  </span>
                  <span className="compound-points">+{compound.points} puan</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* İlerleme göstergesi */}
      {discoveredCompounds.length > 0 && (
        <motion.div
          className="progress-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{
                width: `${(discoveredCompounds.length / 7) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="progress-text">
            {discoveredCompounds.length === 7 ? (
              <span className="complete-text">🎉 Tüm bileşikler keşfedildi!</span>
            ) : (
              <span>
                {7 - discoveredCompounds.length} bileşik daha keşfet!
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const getEffectIcon = (effect) => {
  const icons = {
    bubbles: '💧',
    smoke: '💨',
    vapour: '☁️',
    sparkle: '✨',
    dangerous: '⚠️',
    crystallize: '💎',
  };
  return icons[effect] || '🔬';
};

const getEffectName = (effect) => {
  const names = {
    bubbles: 'Kabarcık',
    smoke: 'Duman',
    vapour: 'Buhar',
    sparkle: 'Pırıltı',
    dangerous: 'Tehlikeli',
    crystallize: 'Kristalleşme',
  };
  return names[effect] || 'Efekt';
};

export default ReactionDisplay;

