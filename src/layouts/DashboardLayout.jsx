import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "../components/ThemeToggle";
import Sidebar from "../components/Sidebar";
import { Menu, IndianRupee } from "lucide-react";

/**
 * DashboardLayout
 *
 * Provides the main page structure for the Money Tracker app.
 * Includes the sidebar, top header with theme toggle, toast notifications,
 * and dynamic content area for child components.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The page content rendered inside the layout.
 */
const DashboardLayout = ({ children }) => {
  // State to track whether the sidebar is open (useful for mobile view)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggles sidebar visibility
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Global toast notification container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "10px",
            fontSize: "0.95rem",
          },
          success: { iconTheme: { primary: "#10b981", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />

      {/* Sidebar navigation (collapsible on mobile) */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main layout area — contains header, content, and footer */}
      <div className="flex-1 flex flex-col">
        {/* Header bar with app title, menu toggle, and theme switch */}
        <header className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-lg border-b border-purple-400/20 dark:border-gray-700 sticky top-0 z-30 transition-all duration-300">
          <div className="px-5 sm:px-8 lg:px-10 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Sidebar toggle button (visible only on mobile) */}
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all backdrop-blur-sm"
                >
                  <Menu size={24} className="text-white dark:text-gray-300" />
                </button>

                {/* App title and icon section */}
                <div className="flex items-center gap-3">
                  <div className="bg-purple-600 p-2.5 rounded-xl hidden lg:flex shadow-lg shadow-purple-500/30">
                    {/* 💰 Replaced old SVG with a clean Lucide icon */}
                    <IndianRupee className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-white drop-shadow-md">
                      Money Tracker
                    </h1>
                  </div>
                </div>
              </div>

              {/* Light/Dark theme switcher */}
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main content area where child pages render */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 transition-all duration-300">
          {children}
        </main>

        {/* Footer with simple copyright */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-inner py-4 transition-colors duration-300">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} Money Tracker — All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
