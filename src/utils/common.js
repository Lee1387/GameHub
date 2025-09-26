export const getStaggerDelay = (index) => `${index * 0.1}s`;

export const formatNumber = (num) => {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateRandomValue = (min, max) =>
  min + Math.random() * (max - min);

export const generateParticles = (count) => {
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

export const generateBubbles = (count, width, height) => {
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

export const updateBubblePosition = (
  bubble,
  containerWidth,
  containerHeight
) => {
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

export const getStoredTheme = () => {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("theme") || "dark";
};

export const setStoredTheme = (theme) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
  }
};

export const applyTheme = (theme) => {
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }
};
