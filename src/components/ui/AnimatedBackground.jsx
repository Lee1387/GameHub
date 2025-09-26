import { useState, useEffect, useRef, useMemo } from "react";

const generateRandomValue = (min, max) => min + Math.random() * (max - min);

const generateBubbles = (count, width, height) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: generateRandomValue(50, width - 50),
    y: generateRandomValue(50, height - 50),
    vx: generateRandomValue(-2, 2),
    vy: generateRandomValue(-2, 2),
    size: generateRandomValue(40, 80),
    hue: generateRandomValue(0, 360),
    opacity: generateRandomValue(0.3, 0.7),
  }));
};

const updateBubblePosition = (bubble, containerWidth, containerHeight) => {
  let { x, y, vx, vy, size } = bubble;
  const radius = size / 2;

  x += vx;
  y += vy;

  if (x - radius <= 0 || x + radius >= containerWidth) {
    vx = -vx;
    x = x - radius <= 0 ? radius : containerWidth - radius;
  }
  if (y - radius <= 0 || y + radius >= containerHeight) {
    vy = -vy;
    y = y - radius <= 0 ? radius : containerHeight - radius;
  }

  return { ...bubble, x, y, vx, vy };
};

function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef();
  const bubblesRef = useRef([]);

  const bubbleCount = 8;

  const animate = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    bubblesRef.current = bubblesRef.current.map((bubble) =>
      updateBubblePosition(bubble, rect.width, rect.height)
    );

    bubblesRef.current.forEach((bubble, index) => {
      const element = containerRef.current?.children[index];
      if (element) {
        element.style.transform = `translate(${bubble.x - bubble.size / 2}px, ${
          bubble.y - bubble.size / 2
        }px)`;
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    bubblesRef.current = generateBubbles(bubbleCount, rect.width, rect.height);
  };

  useEffect(() => {
    if (!mounted) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    bubblesRef.current = generateBubbles(bubbleCount, rect.width, rect.height);

    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initialBubbles = useMemo(
    () => generateBubbles(bubbleCount, 1200, 800),
    []
  );

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {initialBubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full blur-sm transition-none"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: `radial-gradient(circle at 30% 30%, 
              hsla(${bubble.hue}, 70%, 60%, ${bubble.opacity}), 
              hsla(${bubble.hue + 60}, 70%, 50%, ${bubble.opacity * 0.8}), 
              hsla(${bubble.hue + 120}, 70%, 40%, ${bubble.opacity * 0.4})
            )`,
            boxShadow: `0 0 ${bubble.size / 2}px hsla(${
              bubble.hue
            }, 70%, 60%, ${bubble.opacity * 0.5})`,
            transform: `translate(${bubble.x - bubble.size / 2}px, ${
              bubble.y - bubble.size / 2
            }px)`,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 dark:from-blue-400/3 dark:via-purple-400/3 dark:to-cyan-400/3" />
    </div>
  );
}

export default AnimatedBackground;
