import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Define category-specific colors for each expense type.
// These will determine the fill color of the chart segments.
const CATEGORY_COLORS = {
  Food: "#8B5CF6",          // Purple
  Transport: "#06B6D4",     // Cyan
  Entertainment: "#EC4899", // Pink
  Utilities: "#F59E0B",     // Amber
  Health: "#10B981",        // Green
  Shopping: "#FACC15",      // Yellow
  Other: "#6366F1",         // Indigo
};

/**
 * ExpenseDoughnutChart component
 *
 * Renders a doughnut-style pie chart showing the distribution of expenses
 * across various categories. Each category is color-coded for easy distinction.
 *
 * @param {Array} data - Array of expense data objects with `name` and `value` fields.
 * @returns {JSX.Element} The rendered doughnut chart.
 */
const ExpenseDoughnutChart = ({ data = [] }) => {
  // If there’s no data, display a friendly message instead of an empty chart
  if (!data.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        No expense data to display
      </div>
    );
  }

  // Helper function: returns a category color, defaults to gray if not found
  const getColor = (name) => CATEGORY_COLORS[name] || "#9CA3AF";

  /**
   * CustomTooltip component
   *
   * Displays details about a chart slice (category name, value, and percentage)
   * when the user hovers over it.
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;

      // Calculate total expense to derive percentage
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((value / total) * 100).toFixed(1);

      return (
        <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            {name}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
            ₹{value.toFixed(2)}{" "}
            <span className="text-gray-500 dark:text-gray-400">
              ({percentage}%)
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Render the responsive doughnut chart
  return (
    <div className="w-full h-[320px] bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Main doughnut shape configuration */}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            cornerRadius={5}
            dataKey="value"
            isAnimationActive
            animationDuration={900}
            animationEasing="ease-out"
          >
            {/* Render each category segment with its respective color */}
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColor(entry.name)}
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Pie>

          {/* Tooltip for hover info */}
          <Tooltip content={<CustomTooltip />} />

          {/* Legend below the chart listing category names */}
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{ paddingTop: "10px" }}
            formatter={(value) => (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseDoughnutChart;
