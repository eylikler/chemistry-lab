import { motion, AnimatePresence } from 'framer-motion';
import { getTotalCompounds } from '../reactions';

const ReactionDisplay = ({ discoveredCompounds, onCompoundClick }) => {
  const totalCompounds = getTotalCompounds();
  return (
    <div className="reaction-display">
      <h3 className="section-title">
        🔬 Keşfedilen Bileşikler
        <span className="count-badge">{discoveredCompounds.length}/{totalCompounds}</span>
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
                className="compound-card clickable"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onCompoundClick(compound);
                }}
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
                width: `${(discoveredCompounds.length / totalCompounds) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="progress-text">
            {discoveredCompounds.length === totalCompounds ? (
              <span className="complete-text">🎉 Tüm bileşikler keşfedildi!</span>
            ) : (
              <span>
                {totalCompounds - discoveredCompounds.length} bileşik daha keşfet!
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

