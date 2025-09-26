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
