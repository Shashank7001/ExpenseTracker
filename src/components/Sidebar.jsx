import React from "react";
import { X, Home, DollarSign, TrendingDown, BarChart3, List } from "lucide-react";

/**
 * Sidebar navigation component for the expense tracker dashboard.
 * Displays key navigation links and supports mobile toggling.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls whether the sidebar is visible (mainly for mobile).
 * @param {Function} props.toggleSidebar - Toggles sidebar open/close state.
 */
const Sidebar = ({ isOpen, toggleSidebar }) => {
  // List of navigation items with corresponding icons and section anchors
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "#dashboard" },
    { icon: DollarSign, label: "Add Income", path: "#income" },
    { icon: TrendingDown, label: "Add Expense", path: "#expense" },
    { icon: BarChart3, label: "Analytics", path: "#charts" },
    { icon: List, label: "Transactions", path: "#transactions" },
  ];

  return (
    <>
      {/* Background overlay for mobile view (closes sidebar when clicked) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 
          bg-gradient-to-b from-purple-100 via-indigo-50 to-white 
          dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
          shadow-[4px_0_15px_-2px_rgba(0,0,0,0.15)] dark:shadow-[4px_0_20px_-4px_rgba(0,0,0,0.5)]
          border-r border-purple-200/50 dark:border-gray-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
          z-50
        `}
      >
        {/* Close button visible only on mobile screens */}
        <div className="p-4 border-b border-purple-200/40 dark:border-gray-800 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="w-full flex justify-end p-2 rounded-lg hover:bg-purple-100/40 dark:hover:bg-gray-800/50 transition-colors"
          >
            <X size={22} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Sidebar navigation menu */}
        <nav className="p-5 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            // Cycle through gradient color sets for icon backgrounds
            const colors = [
              "from-purple-500 to-indigo-600",
              "from-emerald-500 to-green-600",
              "from-pink-500 to-rose-600",
              "from-sky-500 to-blue-600",
              "from-amber-500 to-orange-600",
            ];
            const bgColor = colors[index % colors.length];

            return (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  // Smoothly scroll to the target section when clicked
                  const section = document.querySelector(item.path);
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                  // Automatically close the sidebar (for mobile)
                  toggleSidebar();
                }}
                className="
                  flex items-center space-x-3 px-4 py-3 rounded-xl
                  text-gray-800 dark:text-gray-300 font-medium
                  hover:bg-white/60 dark:hover:bg-gray-800/70
                  hover:text-purple-700 dark:hover:text-purple-400
                  hover:shadow-lg hover:shadow-purple-500/10
                  border border-transparent hover:border-purple-300/40 dark:hover:border-purple-600/30
                  transition-all duration-200 group
                "
              >
                {/* Icon container with gradient background */}
                <div
                  className={`bg-gradient-to-br ${bgColor} p-2.5 rounded-lg shadow-md shadow-black/10 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon size={18} className="text-white" />
                </div>

                {/* Menu label */}
                <span className="tracking-wide">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
