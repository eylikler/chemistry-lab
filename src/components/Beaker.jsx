import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Beaker = ({ elements, liquidColor, isShaking, onRemoveElement }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'beaker',
  });

  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    if (isOver) {
      setShowBubbles(true);
      const timer = setTimeout(() => setShowBubbles(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOver]);

  // Element sayısını hesapla - tam eklenme sırasına göre
  const getFormula = () => {
    if (elements.length === 0) return 'Boş';

    const result = [];
    let i = 0;
    
    while (i < elements.length) {
      const currentElement = elements[i];
      let count = 1;
      
      // Arka arkaya aynı elementi say
      while (i + count < elements.length && elements[i + count] === currentElement) {
        count++;
      }
      
      // Elementi ekle
      if (count === 1) {
        result.push(currentElement);
      } else {
        // Alt simge için Unicode karakterler kullan
        const subscripts = { 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
        result.push(currentElement + (subscripts[count] || count));
      }
      
      i += count;
    }

    return result.join('');
  };

  const liquidHeight = Math.min((elements.length / 10) * 100, 80);

  return (
    <motion.div
      ref={setNodeRef}
      className={`beaker-container ${isOver ? 'beaker-hover' : ''}`}
      animate={isShaking ? {
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
      } : {}}
    >
      <div className="beaker">
        {/* Ölçüm çizgileri */}
        <div className="measurement-lines">
          <div className="measurement-line" style={{ bottom: '80%' }}>
            <span>500ml</span>
          </div>
          <div className="measurement-line" style={{ bottom: '60%' }}>
            <span>375ml</span>
          </div>
          <div className="measurement-line" style={{ bottom: '40%' }}>
            <span>250ml</span>
          </div>
          <div className="measurement-line" style={{ bottom: '20%' }}>
            <span>125ml</span>
          </div>
        </div>

        {/* Beaker camı */}
        <div className="beaker-glass">
          {/* Sıvı */}
          <motion.div
            className="liquid"
            animate={{
              height: `${liquidHeight}%`,
              backgroundColor: liquidColor,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Kabarcıklar */}
            <AnimatePresence>
              {showBubbles && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="bubble"
                      initial={{
                        bottom: 0,
                        left: `${Math.random() * 80 + 10}%`,
                        scale: 0,
                      }}
                      animate={{
                        bottom: '100%',
                        scale: [0, 1, 0],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* İçerik göstergesi */}
          <div className="beaker-content">
            <motion.div
              className="formula-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {getFormula()}
            </motion.div>

            {/* Element listesi */}
            <div className="element-list">
              <AnimatePresence>
                {elements.map((el, index) => (
                  <motion.div
                    key={`${el}-${index}`}
                    className="element-chip"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={() => onRemoveElement(index)}
                  >
                    {el}
                    <span className="remove-icon">×</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bırak mesajı */}
        {isOver && (
          <motion.div
            className="drop-indicator"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Elementi Bırak!
          </motion.div>
        )}

        {/* Element limiti uyarısı */}
        {elements.length >= 10 && !isOver && (
          <motion.div
            className="limit-warning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Maximum 10 element!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Beaker;

