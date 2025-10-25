import { useEffect, useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import confetti from 'canvas-confetti';

const ParticleEffect = ({ effect, onComplete }) => {
  useEffect(() => {
    if (effect === 'sparkle') {
      triggerSparkle();
    } else if (effect === 'dangerous') {
      triggerExplosion();
    }

    if (onComplete) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [effect, onComplete]);

  const triggerSparkle = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FFD700', '#FFA500', '#FFFF00'],
    });

    fire(0.2, {
      spread: 60,
      colors: ['#FFD700', '#FFA500', '#FFFF00'],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#FFD700', '#FFA500', '#FFFF00'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#FFD700', '#FFA500', '#FFFF00'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#FFD700', '#FFA500', '#FFFF00'],
    });
  };

  const triggerExplosion = () => {
    const duration = 1500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#EF4444', '#DC2626', '#B91C1C', '#FCA5A5'],
        zIndex: 9999,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#EF4444', '#DC2626', '#B91C1C', '#FCA5A5'],
        zIndex: 9999,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const getBubblesConfig = () => ({
    key: 'bubbles',
    fullScreen: true,
    background: {
      color: 'transparent',
    },
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ['#3B82F6', '#60A5FA', '#93C5FD'],
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: { min: 0.4, max: 0.8 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      size: {
        value: { min: 15, max: 40 },
      },
      move: {
        enable: true,
        speed: { min: 3, max: 6 },
        direction: 'top',
        outModes: {
          default: 'out',
          top: 'destroy',
        },
        bounce: false,
      },
    },
    detectRetina: true,
  });

  const getSmokeConfig = () => ({
    key: 'smoke',
    fullScreen: true,
    background: {
      color: 'transparent',
    },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ['#6B7280', '#9CA3AF', '#4B5563'],
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: { min: 0.2, max: 0.6 },
        animation: {
          enable: true,
          speed: 1.5,
          sync: false,
        },
      },
      size: {
        value: { min: 25, max: 50 },
      },
      move: {
        enable: true,
        speed: { min: 2, max: 4 },
        direction: 'top',
        outModes: {
          default: 'out',
        },
        random: true,
      },
    },
    detectRetina: true,
  });

  const getVapourConfig = () => ({
    key: 'vapour',
    fullScreen: true,
    background: {
      color: 'transparent',
    },
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: { min: 0.3, max: 0.7 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      size: {
        value: { min: 20, max: 45 },
      },
      move: {
        enable: true,
        speed: { min: 2, max: 5 },
        direction: 'top',
        outModes: {
          default: 'out',
        },
        random: true,
      },
    },
    detectRetina: true,
  });

  const getCrystallizeConfig = () => ({
    key: 'crystallize',
    fullScreen: true,
    background: {
      color: 'transparent',
    },
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ['#E5E7EB', '#F3F4F6', '#FFFFFF', '#D1D5DB'],
      },
      shape: {
        type: ['circle', 'square', 'triangle', 'polygon'],
        options: {
          polygon: {
            sides: 6,
          },
        },
      },
      opacity: {
        value: { min: 0.5, max: 0.9 },
        animation: {
          enable: true,
          speed: 1.5,
          sync: false,
        },
      },
      size: {
        value: { min: 8, max: 20 },
      },
      move: {
        enable: true,
        speed: { min: 1, max: 3 },
        direction: 'bottom',
        outModes: {
          default: 'out',
        },
      },
      rotate: {
        value: { min: 0, max: 360 },
        animation: {
          enable: true,
          speed: 8,
          sync: false,
        },
      },
    },
    detectRetina: true,
  });

  const getConfig = () => {
    switch (effect) {
      case 'bubbles':
        return getBubblesConfig();
      case 'smoke':
        return getSmokeConfig();
      case 'vapour':
        return getVapourConfig();
      case 'crystallize':
        return getCrystallizeConfig();
      default:
        return null;
    }
  };

  const config = getConfig();

  if (!config && effect !== 'sparkle' && effect !== 'dangerous') {
    return null;
  }

  if (effect === 'sparkle' || effect === 'dangerous') {
    return null; // Confetti handles these
  }

  return (
    <div className="particle-container">
      <Particles
        id={`tsparticles-${effect}`}
        init={particlesInit}
        options={config}
        className="particles"
      />
    </div>
  );
};

export default ParticleEffect;

