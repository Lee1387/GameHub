import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const generateRandomValue = (min, max) =>
  min + Math.random() * (max - min);

export const formatNumber = (num) => {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
};

export const getStaggerDelay = (index, delayMs = 100) => `${index * delayMs}ms`;

export const storage = {
  get: (key, defaultValue = null) => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  remove: (key) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },
};

export const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, label: "No password", color: "gray" };

  let score = 0;
  const feedback = [];

  if (password.length >= 8) {
    score += 2;
  } else if (password.length >= 6) {
    score += 1;
    feedback.push("Use at least 8 characters");
  } else {
    feedback.push("Too short");
  }

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Add lowercase letters");

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Add uppercase letters");

  if (/\d/.test(password)) score += 1;
  else feedback.push("Add numbers");

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push("Add special characters");

  const strength = {
    0: { label: "Very Weak", color: "red" },
    1: { label: "Very Weak", color: "red" },
    2: { label: "Weak", color: "orange" },
    3: { label: "Fair", color: "yellow" },
    4: { label: "Good", color: "blue" },
    5: { label: "Strong", color: "green" },
    6: { label: "Very Strong", color: "green" },
  };

  return {
    score,
    ...strength[score],
    feedback,
    percentage: Math.min((score / 6) * 100, 100),
  };
};

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isLocked]);
};
