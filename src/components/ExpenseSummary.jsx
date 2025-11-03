import React from "react";
import { useExpenses } from "../context/ExpenseContext";
import {
  formatCurrency,
  getExpensesByCategory,
  getTotalExpenses,
  getTotalIncome,
  getBalance,
} from "../utils/Expenses";
import { TrendingDown, Wallet, ArrowUpCircle } from "lucide-react";

/**
 * Displays a summarized overview of the user's income, expenses, and current balance.
 * Also highlights the category with the highest spending.
 * @returns {JSX.Element} Summary cards showing balance, total income, and total expenses.
 */
const ExpenseSummary = () => {
  // Get expense and income data from context
  const { expenses, income } = useExpenses();

  // Calculate key financial stats using utility functions
  const totalExpenses = getTotalExpenses(expenses);
  const totalIncome = getTotalIncome(income);
  const balance = getBalance(income, expenses);
  const categoriesData = getExpensesByCategory(expenses);

  // Track which category the user spent the most on
  let highestCategory = {
    name: "none",
    amount: 0,
  };

  // Loop through each category and find the one with the highest total amount
  Object.entries(categoriesData).forEach(([category, amount]) => {
    if (amount > highestCategory.amount) {
      highestCategory = { name: category, amount: amount };
    }
  });

  return (
    // Responsive grid layout for summary cards
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Current Balance Card */}
      <div
        className={`bg-gradient-to-br ${
          balance >= 0
            ? "from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-600 dark:via-teal-600 dark:to-cyan-600"
            : "from-red-500 via-pink-500 to-rose-500 dark:from-red-600 dark:via-pink-600 dark:to-rose-600"
        } rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 text-white lg:col-span-2 hover:scale-[1.02]`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wide mb-2 flex items-center gap-2">
              {/* Small animated dot next to the heading for visual feedback */}
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              Current Balance
            </h3>

            {/* Display the user's balance */}
            <p className="text-4xl font-bold mt-1 text-white drop-shadow-lg">
              {formatCurrency(balance)}
            </p>

            {/* Income and expense breakdown */}
            <div className="flex gap-4 mt-4 text-sm bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div>
                <span className="text-white/80 text-xs">Income</span>
                <p className="font-bold text-white">
                  {formatCurrency(totalIncome)}
                </p>
              </div>
              <div>
                <span className="text-white/80 text-xs">Expenses</span>
                <p className="font-bold text-white">
                  {formatCurrency(totalExpenses)}
                </p>
              </div>
            </div>
          </div>

          {/* Wallet icon as a visual cue */}
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
            <Wallet size={32} className="text-white" />
          </div>
        </div>
      </div>

      {/* Total Income Card */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-green-200 dark:border-green-800/50 hover:border-green-400 hover:scale-[1.02]">
        <div className="flex items-center space-x-4">
          {/* Icon for income */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl shadow-lg">
            <ArrowUpCircle size={28} className="text-white" />
          </div>

          {/* Income details */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Total Income
            </h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mt-1">
              {formatCurrency(totalIncome)}
            </p>
          </div>
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-red-200 dark:border-red-800/50 hover:border-red-400 hover:scale-[1.02]">
        <div className="flex items-center space-x-4">
          {/* Icon for expenses */}
          <div className="bg-gradient-to-br from-red-500 to-pink-600 p-4 rounded-xl shadow-lg">
            <TrendingDown size={28} className="text-white" />
          </div>

          {/* Expense details */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Total Expenses
            </h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent mt-1">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
