import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const getStoredTheme = () => {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("theme") || "dark";
};

const setStoredTheme = (theme) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
  }
};

const applyTheme = (theme) => {
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export { getStoredTheme, setStoredTheme, applyTheme };
