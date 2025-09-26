import { useState, useEffect, useMemo } from "react";
import { generateRandomValue } from "../../utils/math";

const generateParticles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    duration: generateRandomValue(15, 25),
    size: generateRandomValue(2, 5),
    opacity: generateRandomValue(0.3, 0.7),
    startX: generateRandomValue(0, 100),
    startY: generateRandomValue(0, 100),
    animationDelay: -generateRandomValue(0, 25),
  }));
};

function ParticleBackground({ particleCount = 50 }) {
  const [mounted, setMounted] = useState(false);

  const particles = useMemo(
    () => generateParticles(particleCount),
    [particleCount]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500 rounded-full animate-particle-float"
          style={{
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default ParticleBackground;
