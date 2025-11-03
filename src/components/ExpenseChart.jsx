import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { getChartData, getExpensesByMonth } from "../utils/Expenses";
import { TrendingUp, Circle } from "lucide-react";
import ExpenseLineChart from "./ExpenseLineChart";
import ExpenseDoughnutChart from "./ExpenseDoughnutChart";

/**
 * ExpenseChart component
 *
 * Displays visual analytics for expenses in either a doughnut or line chart format.
 * Users can toggle between chart types to view overall category breakdown or
 * monthly spending trends.
 */
const ExpenseChart = () => {
  // Access the list of expenses from global context
  const { expenses } = useExpenses();

  // Keeps track of the currently active chart type — "doughnut" or "line"
  const [chartType, setChartType] = useState("doughnut");

  // Prepare data for both chart formats
  const chartData = getChartData(expenses); // category-wise data for doughnut chart
  const monthlyData = getExpensesByMonth(expenses); // monthly totals for line chart

  // If there are no expenses, show a friendly placeholder message
  if (expenses.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-xl shadow-lg text-center p-8 border-2 border-blue-200/50 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-expense-dark dark:text-expense mb-6">
          Expense Analytics
        </h2>

        {/* Chart type toggle buttons (inactive state visually disabled) */}
        <div className="flex justify-center flex-wrap mb-6 gap-3">
          <button
            onClick={() => setChartType("doughnut")}
            className={`flex items-center cursor-pointer px-5 py-2.5 rounded-lg transition-all font-medium ${
              chartType === "doughnut"
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 dark:hover:bg-gray-600"
            }`}
          >
            <Circle size={18} className="mr-2" />
            <span>Doughnut</span>
          </button>

          <button
            onClick={() => setChartType("line")}
            className={`flex items-center cursor-pointer px-5 py-2.5 rounded-lg transition-all font-medium ${
              chartType === "line"
                ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 dark:hover:bg-gray-600"
            }`}
          >
            <TrendingUp size={18} className="mr-2" />
            <span>Line Chart</span>
          </button>
        </div>

        {/* Message prompting the user to add data */}
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Add some expenses to see your spending analytics
        </p>
      </div>
    );
  }

  // Render charts when expenses exist
  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-6 border-2 border-blue-200/50 dark:border-gray-700 h-full hover:border-blue-300 dark:hover:border-blue-500/30 transition-all">
      
      {/* Header with title and chart toggle buttons */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-expense-dark dark:text-expense">
          Expense Analytics
        </h2>

        <div className="flex gap-2">
          {/* Toggle button for Doughnut chart */}
          <button
            onClick={() => setChartType("doughnut")}
            className={`flex items-center cursor-pointer px-4 py-2 rounded-lg transition-all font-medium text-sm ${
              chartType === "doughnut"
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 dark:hover:bg-gray-600"
            }`}
          >
            <Circle size={16} className="mr-1.5" />
            <span>Doughnut</span>
          </button>

          {/* Toggle button for Line chart */}
          <button
            onClick={() => setChartType("line")}
            className={`flex items-center cursor-pointer px-4 py-2 rounded-lg transition-all font-medium text-sm ${
              chartType === "line"
                ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 dark:hover:bg-gray-600"
            }`}
          >
            <TrendingUp size={16} className="mr-1.5" />
            <span>Line</span>
          </button>
        </div>
      </div>

      {/* Conditionally render the chart based on selected type */}
      <div className="mt-4">
        {chartType === "doughnut" ? (
          <ExpenseDoughnutChart data={chartData} /> // Category-based spending breakdown
        ) : (
          <ExpenseLineChart data={monthlyData} /> // Month-by-month spending trend
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
