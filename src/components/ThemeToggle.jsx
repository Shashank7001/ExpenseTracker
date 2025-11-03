import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle component
 * 
 * A small floating button that allows users to switch between light and dark modes.
 * Uses the global `ThemeContext` to manage and persist theme state across the app.
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  /**
   * Handles the theme toggle action.
   * Calls the context-provided `toggleTheme()` function
   * which switches between light and dark mode.
   */
  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      className="
        p-2.5 rounded-xl 
        bg-white/20 dark:bg-gray-700/50 
        backdrop-blur-sm 
        text-white dark:text-gray-200 
        hover:bg-white/30 dark:hover:bg-gray-600 
        border border-white/30 dark:border-gray-600 
        transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-white/50 
        shadow-lg hover:scale-110
      "
      aria-label="Toggle theme"
    >
      {/* 
        Show a Moon icon when the current theme is light 
        (indicating that clicking will switch to dark mode),
        and a Sun icon when in dark mode (to switch back to light).
      */}
      {theme === "light" ? (
        <Moon size={20} className="text-white dark:text-gray-200" />
      ) : (
        <Sun size={20} className="text-white dark:text-gray-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
