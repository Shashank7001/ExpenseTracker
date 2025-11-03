import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context to store theme-related data and actions (light/dark)
const ThemeContext = createContext();

/**
 * ThemeProvider component
 *
 * Manages light/dark theme toggling and persists the user's preference
 * in localStorage. Also applies the correct Tailwind `dark` class
 * to the <html> element when the theme changes.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The wrapped components that can access the theme context.
 */
export const ThemeProvider = ({ children }) => {
  /**
   * Initialize theme state
   * - Check localStorage for saved preference
   * - Apply the stored theme class to <html> if it exists
   * - Default to "light" theme otherwise
   */
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) {
        const root = document.documentElement;
        if (savedTheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
        return savedTheme;
      }
    }
    return "light";
  });

  /**
   * Whenever `theme` changes:
   * - Add or remove the `dark` class on <html>
   * - Save the updated preference to localStorage
   */
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  /**
   * Toggle between light and dark themes.
   * This updates both the state and the <html> class via the effect above.
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Value exposed to components using this context
  const value = {
    theme, // current theme ("light" or "dark")
    toggleTheme, // function to toggle theme
    isDark: theme === "dark", // convenience flag for conditional rendering
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to easily access theme state and actions
 * Throws an error if called outside of the ThemeProvider
 *
 * @returns {Object} { theme, toggleTheme, isDark }
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
