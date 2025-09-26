import { useState, useEffect, useMemo } from "react";
import { generateParticles } from "../../utils/common";

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
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-particle-float"
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
