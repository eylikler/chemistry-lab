import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const CompoundVisualization = ({ isOpen, onClose, compounds }) => {
  const [selectedCompound, setSelectedCompound] = useState(null);

  // Molekül görselleştirmesi için atom pozisyonları
  const getMoleculeLayout = (formula) => {
    const layouts = {
      'H2O': [
        { element: 'O', x: 50, y: 50, color: '#BFDBFE', size: 50 },
        { element: 'H', x: 20, y: 30, color: '#FFFFFF', size: 35, bond: { to: 0, angle: 135 } },
        { element: 'H', x: 80, y: 30, color: '#FFFFFF', size: 35, bond: { to: 0, angle: 45 } },
      ],
      'CO2': [
        { element: 'C', x: 50, y: 50, color: '#9CA3AF', size: 45 },
        { element: 'O', x: 15, y: 50, color: '#BFDBFE', size: 45, bond: { to: 0, type: 'double' } },
        { element: 'O', x: 85, y: 50, color: '#BFDBFE', size: 45, bond: { to: 0, type: 'double' } },
      ],
      'NH3': [
        { element: 'N', x: 50, y: 55, color: '#C4B5FD', size: 45 },
        { element: 'H', x: 50, y: 25, color: '#FFFFFF', size: 30, bond: { to: 0 } },
        { element: 'H', x: 25, y: 75, color: '#FFFFFF', size: 30, bond: { to: 0 } },
        { element: 'H', x: 75, y: 75, color: '#FFFFFF', size: 30, bond: { to: 0 } },
      ],
      'NaCl': [
        { element: 'Na', x: 35, y: 50, color: '#FED7AA', size: 50 },
        { element: 'Cl', x: 65, y: 50, color: '#86EFAC', size: 50, bond: { to: 0, type: 'ionic' } },
      ],
      'H2SO4': [
        { element: 'S', x: 50, y: 50, color: '#FEF08A', size: 45 },
        { element: 'O', x: 50, y: 20, color: '#BFDBFE', size: 35, bond: { to: 0, type: 'double' } },
        { element: 'O', x: 80, y: 50, color: '#BFDBFE', size: 35, bond: { to: 0 } },
        { element: 'H', x: 90, y: 40, color: '#FFFFFF', size: 25, bond: { to: 2 } },
        { element: 'O', x: 20, y: 50, color: '#BFDBFE', size: 35, bond: { to: 0 } },
        { element: 'H', x: 10, y: 40, color: '#FFFFFF', size: 25, bond: { to: 4 } },
        { element: 'O', x: 50, y: 80, color: '#BFDBFE', size: 35, bond: { to: 0, type: 'double' } },
      ],
      'CaCO3': [
        { element: 'Ca', x: 30, y: 50, color: '#E5E7EB', size: 50 },
        { element: 'C', x: 60, y: 50, color: '#9CA3AF', size: 40 },
        { element: 'O', x: 75, y: 30, color: '#BFDBFE', size: 35, bond: { to: 1, type: 'double' } },
        { element: 'O', x: 75, y: 70, color: '#BFDBFE', size: 35, bond: { to: 1 } },
        { element: 'O', x: 85, y: 50, color: '#BFDBFE', size: 35, bond: { to: 1 } },
      ],
      'CH4': [
        { element: 'C', x: 50, y: 50, color: '#9CA3AF', size: 45 },
        { element: 'H', x: 50, y: 20, color: '#FFFFFF', size: 30, bond: { to: 0 } },
        { element: 'H', x: 80, y: 50, color: '#FFFFFF', size: 30, bond: { to: 0 } },
        { element: 'H', x: 50, y: 80, color: '#FFFFFF', size: 30, bond: { to: 0 } },
        { element: 'H', x: 20, y: 50, color: '#FFFFFF', size: 30, bond: { to: 0 } },
      ],
      'HCl': [
        { element: 'H', x: 35, y: 50, color: '#FFFFFF', size: 40 },
        { element: 'Cl', x: 65, y: 50, color: '#86EFAC', size: 50, bond: { to: 0 } },
      ],
      'NO2': [
        { element: 'N', x: 50, y: 50, color: '#C4B5FD', size: 45 },
        { element: 'O', x: 30, y: 35, color: '#BFDBFE', size: 40, bond: { to: 0, type: 'double' } },
        { element: 'O', x: 70, y: 35, color: '#BFDBFE', size: 40, bond: { to: 0 } },
      ],
      'NaOH': [
        { element: 'Na', x: 30, y: 50, color: '#FED7AA', size: 50 },
        { element: 'O', x: 60, y: 50, color: '#BFDBFE', size: 45, bond: { to: 0, type: 'ionic' } },
        { element: 'H', x: 80, y: 50, color: '#FFFFFF', size: 35, bond: { to: 1 } },
      ],
      'MgO': [
        { element: 'Mg', x: 40, y: 50, color: '#8AFF00', size: 50 },
        { element: 'O', x: 60, y: 50, color: '#BFDBFE', size: 45, bond: { to: 0, type: 'ionic' } },
      ],
      'C6H12O6': [
        { element: 'C', x: 50, y: 30, color: '#9CA3AF', size: 35 },
        { element: 'C', x: 70, y: 40, color: '#9CA3AF', size: 35 },
        { element: 'C', x: 70, y: 60, color: '#9CA3AF', size: 35 },
        { element: 'C', x: 50, y: 70, color: '#9CA3AF', size: 35 },
        { element: 'C', x: 30, y: 60, color: '#9CA3AF', size: 35 },
        { element: 'C', x: 30, y: 40, color: '#9CA3AF', size: 35 },
        { element: 'O', x: 50, y: 10, color: '#BFDBFE', size: 30, bond: { to: 0 } },
        { element: 'H', x: 85, y: 35, color: '#FFFFFF', size: 25, bond: { to: 1 } },
        { element: 'H', x: 85, y: 65, color: '#FFFFFF', size: 25, bond: { to: 2 } },
        { element: 'H', x: 50, y: 85, color: '#FFFFFF', size: 25, bond: { to: 3 } },
        { element: 'H', x: 15, y: 65, color: '#FFFFFF', size: 25, bond: { to: 4 } },
        { element: 'H', x: 15, y: 35, color: '#FFFFFF', size: 25, bond: { to: 5 } },
      ],
      'CH3COOH': [
        { element: 'C', x: 30, y: 50, color: '#9CA3AF', size: 40 },
        { element: 'H', x: 20, y: 30, color: '#FFFFFF', size: 25, bond: { to: 0 } },
        { element: 'H', x: 15, y: 55, color: '#FFFFFF', size: 25, bond: { to: 0 } },
        { element: 'H', x: 20, y: 70, color: '#FFFFFF', size: 25, bond: { to: 0 } },
        { element: 'C', x: 55, y: 50, color: '#9CA3AF', size: 40, bond: { to: 0 } },
        { element: 'O', x: 70, y: 35, color: '#BFDBFE', size: 35, bond: { to: 4, type: 'double' } },
        { element: 'O', x: 70, y: 65, color: '#BFDBFE', size: 35, bond: { to: 4 } },
        { element: 'H', x: 85, y: 70, color: '#FFFFFF', size: 25, bond: { to: 6 } },
      ],
      'C2H5OH': [
        { element: 'C', x: 30, y: 50, color: '#9CA3AF', size: 40 },
        { element: 'H', x: 15, y: 40, color: '#FFFFFF', size: 25, bond: { to: 0 } },
        { element: 'H', x: 15, y: 60, color: '#FFFFFF', size: 25, bond: { to: 0 } },
        { element: 'H', x: 25, y: 70, color: '#FFFFFF', size: 25, bond: { to: 0 } },
        { element: 'C', x: 55, y: 50, color: '#9CA3AF', size: 40, bond: { to: 0 } },
        { element: 'H', x: 65, y: 35, color: '#FFFFFF', size: 25, bond: { to: 4 } },
        { element: 'H', x: 65, y: 65, color: '#FFFFFF', size: 25, bond: { to: 4 } },
        { element: 'O', x: 75, y: 50, color: '#BFDBFE', size: 35, bond: { to: 4 } },
        { element: 'H', x: 90, y: 50, color: '#FFFFFF', size: 25, bond: { to: 7 } },
      ],
    };
    return layouts[formula] || [];
  };

  const handleCompoundClick = (compound) => {
    setSelectedCompound(compound);
  };

  const handleCloseVisualization = () => {
    setSelectedCompound(null);
  };

  // Bileşik için görsel/emoji ve animasyon tipi
  const getCompoundVisual = (formula) => {
    const visuals = {
      'H2O': { emoji: '💧', animation: 'water-drop', color: '#3B82F6' },
      'CO2': { emoji: '💨', animation: 'smoke', color: '#6B7280' },
      'NH3': { emoji: '🧪', animation: 'vapor', color: '#8B5CF6' },
      'NaCl': { emoji: '🧂', animation: 'crystallize', color: '#F3F4F6' },
      'H2SO4': { emoji: '⚠️', animation: 'danger', color: '#EF4444' },
      'CaCO3': { emoji: '🪨', animation: 'rock', color: '#E5E7EB' },
      'CH4': { emoji: '🔥', animation: 'flame', color: '#84CC16' },
      'HCl': { emoji: '🧪', animation: 'acid', color: '#EAB308' },
      'NO2': { emoji: '☠️', animation: 'toxic', color: '#DC2626' },
      'NaOH': { emoji: '🧼', animation: 'soap', color: '#F97316' },
      'MgO': { emoji: '✨', animation: 'sparkle', color: '#F3F4F6' },
      'C6H12O6': { emoji: '🍬', animation: 'sweet', color: '#FDE047' },
      'CH3COOH': { emoji: '🥗', animation: 'vinegar', color: '#F59E0B' },
      'C2H5OH': { emoji: '🍷', animation: 'alcohol', color: '#06B6D4' },
    };
    return visuals[formula] || { emoji: '⚗️', animation: 'default', color: '#667eea' };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="compound-viz-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="compound-viz-modal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Başlık */}
            <div className="compound-viz-header">
              <h2>🧬 Bileşik Molekülleri</h2>
              <button className="close-btn" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* Açıklama */}
            <div className="compound-viz-info">
              <p>
                <strong>Molekül yapılarını görmek için bir bileşiğe tıklayın!</strong>
              </p>
            </div>

            {/* Bileşik Listesi */}
            <div className="compound-viz-grid">
              {Object.entries(compounds).map(([formula, data], index) => (
                <motion.div
                  key={formula}
                  className="compound-viz-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompoundClick({ formula, ...data })}
                  style={{ backgroundColor: data.color }}
                >
                  <div className="compound-viz-formula">{formula}</div>
                  <div className="compound-viz-name">{data.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Molekül Görselleştirme Modalı */}
          <AnimatePresence>
            {selectedCompound && (
              <motion.div
                className="molecule-viewer-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseVisualization}
              >
                <motion.div
                  className="molecule-viewer"
                  initial={{ scale: 0.3, opacity: 0, rotateY: -180 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  exit={{ scale: 0.3, opacity: 0, rotateY: 180 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Başlık */}
                  <div className="molecule-viewer-header">
                    <div className="molecule-viewer-title">
                      <div className="molecule-viewer-formula">{selectedCompound.formula}</div>
                      <div className="molecule-viewer-name">{selectedCompound.name}</div>
                    </div>
                    <button className="close-btn-small" onClick={handleCloseVisualization}>
                      ✕
                    </button>
                  </div>

                  {/* Bileşik Görseli/Fotoğrafı */}
                  <div className="compound-visual-container">
                    <motion.div
                      className={`compound-visual ${getCompoundVisual(selectedCompound.formula).animation}`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      <motion.div
                        className="compound-emoji"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {getCompoundVisual(selectedCompound.formula).emoji}
                      </motion.div>
                      
                      {/* Su damlası efekti (H2O için) */}
                      {selectedCompound.formula === 'H2O' && (
                        <div className="water-drops">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="water-drop"
                              initial={{ y: -20, opacity: 0 }}
                              animate={{ 
                                y: 100,
                                opacity: [0, 1, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: 'easeIn',
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Duman efekti (CO2 için) */}
                      {selectedCompound.formula === 'CO2' && (
                        <div className="smoke-effect">
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="smoke-puff"
                              initial={{ y: 20, opacity: 0, scale: 0.5 }}
                              animate={{ 
                                y: -50,
                                opacity: [0, 0.6, 0],
                                scale: [0.5, 1.5, 2],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.7,
                                ease: 'easeOut',
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Alev efekti (CH4 için) */}
                      {selectedCompound.formula === 'CH4' && (
                        <div className="flame-effect">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="flame"
                              animate={{ 
                                scaleY: [1, 1.3, 0.9, 1.2, 1],
                                scaleX: [1, 0.9, 1.1, 0.95, 1],
                                opacity: [0.8, 1, 0.7, 1, 0.8],
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: 'easeInOut',
                              }}
                              style={{ left: `${30 + i * 15}%` }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Parıltı efekti (MgO, NaCl için) */}
                      {(selectedCompound.formula === 'MgO' || selectedCompound.formula === 'NaCl') && (
                        <div className="sparkle-effect">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="sparkle-star"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ 
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                                rotate: [0, 180, 360],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.25,
                                ease: 'easeInOut',
                              }}
                              style={{
                                left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 40}%`,
                                top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 40}%`,
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Tehlike efekti (H2SO4, NO2 için) */}
                      {(selectedCompound.formula === 'H2SO4' || selectedCompound.formula === 'NO2') && (
                        <motion.div
                          className="danger-pulse"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}

                      {/* Köpük efekti (NaOH için) */}
                      {selectedCompound.formula === 'NaOH' && (
                        <div className="bubble-effect">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="soap-bubble"
                              initial={{ y: 30, scale: 0, opacity: 0 }}
                              animate={{ 
                                y: -40,
                                scale: [0, 1, 1.2, 0],
                                opacity: [0, 0.8, 0.8, 0],
                                x: [0, Math.sin(i) * 20, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: 'easeOut',
                              }}
                              style={{ left: `${30 + i * 10}%` }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Kristal efekti (CaCO3, C6H12O6 için) */}
                      {(selectedCompound.formula === 'CaCO3' || selectedCompound.formula === 'C6H12O6') && (
                        <motion.div
                          className="crystal-effect"
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="crystal-shard"
                              style={{
                                transform: `rotate(${i * 60}deg) translateY(-30px)`,
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Molekül Görselleştirme Alanı */}
                  <div className="molecule-canvas">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      {/* Bağlar (Bonds) */}
                      {getMoleculeLayout(selectedCompound.formula).map((atom, index) => {
                        if (atom.bond) {
                          const targetAtom = getMoleculeLayout(selectedCompound.formula)[atom.bond.to];
                          return (
                            <g key={`bond-${index}`}>
                              {atom.bond.type === 'double' ? (
                                <>
                                  <motion.line
                                    x1={targetAtom.x}
                                    y1={targetAtom.y}
                                    x2={atom.x}
                                    y2={atom.y}
                                    stroke={atom.bond.type === 'ionic' ? '#FCD34D' : '#374151'}
                                    strokeWidth={atom.bond.type === 'ionic' ? '0.5' : '0.8'}
                                    strokeDasharray={atom.bond.type === 'ionic' ? '2,2' : '0'}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                  />
                                  <motion.line
                                    x1={targetAtom.x + 1.5}
                                    y1={targetAtom.y + 1.5}
                                    x2={atom.x + 1.5}
                                    y2={atom.y + 1.5}
                                    stroke="#374151"
                                    strokeWidth="0.8"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                                  />
                                </>
                              ) : (
                                <motion.line
                                  x1={targetAtom.x}
                                  y1={targetAtom.y}
                                  x2={atom.x}
                                  y2={atom.y}
                                  stroke={atom.bond.type === 'ionic' ? '#FCD34D' : '#374151'}
                                  strokeWidth={atom.bond.type === 'ionic' ? '0.5' : '1.2'}
                                  strokeDasharray={atom.bond.type === 'ionic' ? '2,2' : '0'}
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.5, delay: index * 0.1 }}
                                />
                              )}
                            </g>
                          );
                        }
                        return null;
                      })}

                      {/* Atomlar */}
                      {getMoleculeLayout(selectedCompound.formula).map((atom, index) => (
                        <motion.g
                          key={`atom-${index}`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            opacity: 1,
                          }}
                          transition={{ 
                            delay: index * 0.15,
                            type: 'spring',
                            stiffness: 200,
                            damping: 10
                          }}
                        >
                          {/* Atom gölgesi */}
                          <circle
                            cx={atom.x + 0.5}
                            cy={atom.y + 0.5}
                            r={atom.size / 10}
                            fill="rgba(0,0,0,0.2)"
                            filter="blur(1px)"
                          />
                          
                          {/* Atom */}
                          <motion.circle
                            cx={atom.x}
                            cy={atom.y}
                            r={atom.size / 10}
                            fill={atom.color}
                            stroke="#1F2937"
                            strokeWidth="0.3"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2,
                            }}
                          />
                          
                          {/* Atom parlaması */}
                          <motion.circle
                            cx={atom.x - atom.size / 40}
                            cy={atom.y - atom.size / 40}
                            r={atom.size / 30}
                            fill="rgba(255,255,255,0.6)"
                            animate={{
                              opacity: [0.6, 0.3, 0.6],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2,
                            }}
                          />
                          
                          {/* Element sembolü */}
                          <text
                            x={atom.x}
                            y={atom.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#1F2937"
                            fontSize={atom.size / 10}
                            fontWeight="bold"
                            style={{ userSelect: 'none' }}
                          >
                            {atom.element}
                          </text>
                        </motion.g>
                      ))}
                    </svg>

                    {/* Dönen parçacıklar */}
                    <div className="molecule-particles">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="molecule-particle"
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                          animate={{
                            x: [0, Math.cos(i * 45 * Math.PI / 180) * 150],
                            y: [0, Math.sin(i * 45 * Math.PI / 180) * 150],
                            opacity: [0, 0.6, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeOut',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Açıklama */}
                  <div className="molecule-viewer-description">
                    <p><strong>📝 Açıklama:</strong> {selectedCompound.description}</p>
                    <p><strong>🎨 Efekt:</strong> {selectedCompound.effect}</p>
                    <p><strong>🏆 Puan:</strong> {selectedCompound.points}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompoundVisualization;

