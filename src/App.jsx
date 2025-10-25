import { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import ElementCard from './components/ElementCard';
import Beaker from './components/Beaker';
import ReactionDisplay from './components/ReactionDisplay';
import ParticleEffect from './components/ParticleEffect';
import PeriodicTable from './components/PeriodicTable';
import { defaultElements, allPeriodicElements, reactions } from './reactions';
import './App.css';

function App() {
  const [elements, setElements] = useState(defaultElements);
  const [beakerElements, setBeakerElements] = useState([]);
  const [liquidColor, setLiquidColor] = useState('#BFDBFE');
  const [discoveredCompounds, setDiscoveredCompounds] = useState([]);
  const [score, setScore] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [currentEffect, setCurrentEffect] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPeriodicTable, setShowPeriodicTable] = useState(false);

  // Ses efektleri
  const playSound = (type) => {
    const sounds = {
      drop: [196, 0.1],
      success: [523, 0.2],
      error: [196, 0.1],
      mix: [392, 0.15],
    };

    if (sounds[type]) {
      const [frequency, duration] = sounds[type];
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    }
  };

  // Sürükle-bırak işlemi
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === 'beaker') {
      if (beakerElements.length >= 7) {
        toast.error('Beaker dolu! Maximum 7 element ekleyebilirsiniz.', {
          icon: '⚠️',
        });
        playSound('error');
        return;
      }

      const element = elements.find((el) => el.symbol === active.id);
      if (element) {
        setBeakerElements([...beakerElements, element.symbol]);
        setLiquidColor(element.color);
        playSound('drop');
        toast.success(`${element.name} eklendi!`, {
          icon: '✅',
          duration: 2000,
        });
      }
    }
  };

  // Element çıkar
  const handleRemoveElement = (index) => {
    const newElements = beakerElements.filter((_, i) => i !== index);
    setBeakerElements(newElements);
    playSound('drop');

    if (newElements.length === 0) {
      setLiquidColor('#BFDBFE');
    }
  };

  // Reaksiyonu kontrol et
  const checkReaction = () => {
    if (beakerElements.length === 0) {
      toast.error('Beaker boş! Element ekleyin.', { icon: '❌' });
      playSound('error');
      return;
    }

    playSound('mix');

    // Elementleri sırala
    const sortedElements = [...beakerElements].sort();

    // Her reaksiyonu kontrol et
    let foundReaction = null;

    for (const [formula, reaction] of Object.entries(reactions)) {
      const sortedReactionElements = [...reaction.elements].sort();

      if (
        sortedElements.length === sortedReactionElements.length &&
        sortedElements.every((el, i) => el === sortedReactionElements[i])
      ) {
        foundReaction = { formula, ...reaction };
        break;
      }
    }

    if (foundReaction) {
      // Başarılı reaksiyon
      const alreadyDiscovered = discoveredCompounds.some(
        (c) => c.formula === foundReaction.formula
      );

      if (!alreadyDiscovered) {
        setDiscoveredCompounds([...discoveredCompounds, foundReaction]);
        setScore(score + foundReaction.points);
        toast.success(
          `🎉 Yeni bileşik keşfettiniz: ${foundReaction.name}! +${foundReaction.points} puan`,
          {
            duration: 4000,
            style: {
              background: foundReaction.color,
              color: '#fff',
              fontWeight: 'bold',
            },
          }
        );
      } else {
        toast(`${foundReaction.name} zaten keşfedildi!`, {
          icon: 'ℹ️',
          duration: 3000,
        });
      }

      // Efekti göster
      setLiquidColor(foundReaction.color);
      setCurrentEffect(foundReaction.effect);
      setIsSuccess(true);
      playSound('success');

      // Animasyonu temizle
      setTimeout(() => {
        setCurrentEffect(null);
        setIsSuccess(false);
        setBeakerElements([]);
        setLiquidColor('#BFDBFE');
      }, 2500);
    } else {
      // Başarısız reaksiyon
      toast.error('Geçersiz kombinasyon! Tekrar deneyin.', {
        icon: '❌',
        duration: 3000,
      });
      setIsShaking(true);
      playSound('error');
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  // Sıfırla
  const resetBeaker = () => {
    setBeakerElements([]);
    setLiquidColor('#BFDBFE');
    playSound('drop');
    toast('Beaker temizlendi!', { icon: '🧹' });
  };

  // Tümünü sıfırla
  const resetAll = () => {
    if (window.confirm('Tüm ilerlemeyi sıfırlamak istediğinizden emin misiniz?')) {
      setBeakerElements([]);
      setLiquidColor('#BFDBFE');
      setDiscoveredCompounds([]);
      setScore(0);
      setElements(defaultElements);
      toast.success('Oyun sıfırlandı!', { icon: '🔄' });
    }
  };

  // Element ekle/çıkar
  const toggleElement = (periodicElement) => {
    const exists = elements.some(el => el.symbol === periodicElement.symbol);
    
    if (exists) {
      // Elementi çıkar
      const newElements = elements.filter(el => el.symbol !== periodicElement.symbol);
      setElements(newElements);
      toast.success(`${periodicElement.name} ana ekrandan çıkarıldı!`, {
        icon: '➖',
        duration: 2000,
      });
      playSound('drop');
    } else {
      // Elementi ekle
      const newElement = {
        symbol: periodicElement.symbol,
        name: periodicElement.name,
        atomicNumber: periodicElement.atomicNumber,
        color: periodicElement.color,
        textColor: periodicElement.textColor,
      };
      setElements([...elements, newElement]);
      toast.success(`${periodicElement.name} ana ekrana eklendi!`, {
        icon: '➕',
        duration: 2000,
      });
      playSound('success');
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="app">
        <Toaster position="top-center" />

        {/* Arka plan parçacıkları */}
        <div className="background-particles">
          <ParticleEffect effect="vapour" />
        </div>

        {/* Başlık */}
        <motion.header
          className="app-header"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <h1 className="app-title">🧪 Kimya Laboratuvarı - Elementleri Karıştır!</h1>
          <div className="score-display">
            <motion.div
              className="score-value"
              key={score}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              🏆 {score} Puan
            </motion.div>
          </div>
        </motion.header>

        {/* Ana içerik */}
        <main className="app-main">
          {/* Sol panel - Element kartları */}
          <motion.section
            className="elements-section"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="section-title">⚛️ Elementler</h2>
            <div className="elements-grid">
              {elements.map((element, index) => (
                <motion.div
                  key={element.symbol}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <ElementCard element={element} />
                </motion.div>
              ))}
            </div>
            <div className="instructions-box">
              <p>💡 <strong>Nasıl Oynanır:</strong></p>
              <ol>
                <li>Elementleri beaker'a sürükleyin</li>
                <li>"Karıştır" butonuna basın</li>
                <li>Doğru kombinasyonları keşfedin!</li>
              </ol>
            </div>
          </motion.section>

          {/* Orta panel - Beaker */}
          <motion.section
            className="beaker-section"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, scale: isSuccess ? 1.1 : 1 }}
            transition={{ delay: 0.3 }}
          >
            <Beaker
              elements={beakerElements}
              liquidColor={liquidColor}
              isShaking={isShaking}
              onRemoveElement={handleRemoveElement}
            />

            {/* Efekt katmanı */}
            <AnimatePresence>
              {currentEffect && (
                <motion.div
                  className="effect-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ParticleEffect effect={currentEffect} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Kontrol butonları */}
            <div className="controls">
              <motion.button
                className="btn btn-primary"
                onClick={checkReaction}
                disabled={beakerElements.length === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🧪 Karıştır
              </motion.button>
              <motion.button
                className="btn btn-secondary"
                onClick={resetBeaker}
                disabled={beakerElements.length === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🧹 Temizle
              </motion.button>
              <motion.button
                className="btn btn-danger"
                onClick={resetAll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Sıfırla
              </motion.button>
      </div>
          </motion.section>

          {/* Sağ panel - Keşfedilen bileşikler */}
          <motion.section
            className="compounds-section"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ReactionDisplay discoveredCompounds={discoveredCompounds} />
          </motion.section>
        </main>

        {/* Kullanım talimatları modal */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInstructions(false)}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2>🧪 Kimya Laboratuvarına Hoş Geldiniz!</h2>
                <div className="modal-body">
                  <p>
                    <strong>Hedef:</strong> 6 farklı kimyasal bileşiği keşfedin ve puan kazanın!
                  </p>
                  <div className="instructions-list">
                    <div className="instruction-item">
                      <span className="instruction-icon">1️⃣</span>
                      <span>Sol taraftaki elementleri ortadaki beaker'a sürükleyin</span>
                    </div>
                    <div className="instruction-item">
                      <span className="instruction-icon">2️⃣</span>
                      <span>Doğru kombinasyonu oluşturduktan sonra "Karıştır" butonuna basın</span>
                    </div>
                    <div className="instruction-item">
                      <span className="instruction-icon">3️⃣</span>
                      <span>Her doğru bileşik puan kazandırır ve özel efekt gösterir</span>
                    </div>
                    <div className="instruction-item">
                      <span className="instruction-icon">💡</span>
                      <span>İpucu: Su için 2 Hidrojen + 1 Oksijen deneyin!</span>
                    </div>
                  </div>
                  <motion.button
                    className="btn btn-primary btn-large"
                    onClick={() => setShowInstructions(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Başlayalım! 🚀
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Periyodik tablo referans butonu */}
        <motion.button
          className="reference-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowPeriodicTable(true)}
          title="Periyodik Tabloyu Aç"
        >
          📊
        </motion.button>

        {/* Periyodik Tablo Modal */}
        <PeriodicTable
          isOpen={showPeriodicTable}
          onClose={() => setShowPeriodicTable(false)}
          availableElements={elements}
          allElements={allPeriodicElements}
          onToggleElement={toggleElement}
        />
      </div>
    </DndContext>
  );
}

export default App;
