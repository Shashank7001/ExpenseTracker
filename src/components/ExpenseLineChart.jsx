import React from "react";
import { formatCurrency } from "../utils/Expenses";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * Renders a line chart showing expense trends over time.
 * @param {Object} props
 * @param {Object} props.data - An object where keys are time periods (like months)
 * and values are total expense amounts.
 */
const ExpenseLineChart = ({ data }) => {
  // Transform the input object into an array of { name, amount } pairs for Recharts
  const chartData = Object.entries(data)
    .map(([name, value]) => ({
      name,
      amount: value,
    }))
    .reverse(); // Reverse to show oldest data first (chronological order)

  // Show a fallback message when there's no data
  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No expense data to display
      </div>
    );
  }

  /**
   * Custom tooltip component for showing formatted values and labels
   * inside the chart when hovering over data points.
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md border border-gray-100 dark:border-gray-700">
          {/* Display the date or label of the data point */}
          <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
            {label}
          </p>
          {/* Show the formatted expense value */}
          <p className="text-lg font-bold text-expense dark:text-expense-light">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    // Responsive container ensures the chart scales with the screen size
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60,
        }}
      >
        {/* Adds grid lines for better readability */}
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
          className="dark:stroke-gray-700"
        />

        {/* X-axis showing dates or categories */}
        <XAxis
          dataKey="name"
          angle={-45} // Rotate labels to avoid overlap
          textAnchor="end"
          height={60}
          tick={{ fontSize: 12, fill: "currentColor" }}
          stroke="#6b7280"
          className="dark:stroke-gray-400"
        />

        {/* Y-axis showing amounts in currency format */}
        <YAxis
          tickFormatter={(value) => `₹${value}`}
          tick={{
            fontSize: 12,
            fill: "currentColor",
          }}
          stroke="#6b7280"
          className="dark:stroke-gray-400"
        />

        {/* Tooltip displays data on hover */}
        <Tooltip content={<CustomTooltip />} />

        {/* Legend showing which line represents what data */}
        <Legend
          wrapperStyle={{ color: "inherit" }}
          formatter={(value) => (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {value}
            </span>
          )}
        />

        {/* The main expense trend line */}
        <Line
          type="monotone" // Smooth curved line
          dataKey="amount" // Uses the 'amount' field for Y-values
          stroke="#9b87f5"
          strokeWidth={3}
          dot={{ fill: "#9b87f5", r: 5 }} // Dots for data points
          activeDot={{ r: 7, fill: "#6e59a5" }} // Larger dot on hover
          animationDuration={750}
          animationBegin={0}
          animationEasing="ease-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseLineChart;
