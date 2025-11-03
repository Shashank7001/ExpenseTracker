import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";
import {
  formatCurrency,
  formatDate,
  getCategoryTextColor,
} from "../utils/Expenses";
import { Trash2 } from "lucide-react";

/**
 * Displays a list of all expenses with category filtering and delete functionality.
 * @component
 */
const ExpenseList = () => {
  // Access expenses and delete functionality from global context
  const { expenses, deleteExpense } = useExpenses();

  // Track the currently selected category filter
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Options for the category filter dropdown
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "utilities", label: "Utilities" },
    { value: "health", label: "Health & Medical" },
    { value: "other", label: "Other" },
  ];

  // Filter expenses based on selected category
  const filteredExpenses = expenses.filter(
    (expense) => categoryFilter === "all" || expense.category === categoryFilter
  );

  // Sort filtered expenses by date (newest first)
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  /**
   * Handles deleting an expense and shows a success toast afterward.
   * @param {string} id - The ID of the expense to delete.
   */
  const handleDelete = (id) => {
    deleteExpense(id);
    toast.success("Expense deleted successfully");
  };

  return (
    <div className="w-full">
      {/* Filter dropdown for selecting expense category */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-expense focus:border-transparent transition-all shadow-sm hover:shadow-md font-medium cursor-pointer"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Empty state if no expenses match the filter */}
      {sortedExpenses.length === 0 ? (
        <div className="bg-gradient-to-br from-white via-red-50/20 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-12 text-center text-gray-500 dark:text-gray-400 border-2 border-red-200/50 dark:border-gray-700">
          <p className="mb-2 text-lg font-medium">No expenses found</p>
          {categoryFilter !== "all" && (
            <p className="text-sm">
              Try changing the category filter or add new expenses.
            </p>
          )}
        </div>
      ) : (
        // Expense table displaying filtered + sorted results
        <div className="bg-gradient-to-br from-white via-red-50/20 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-red-200/50 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th></th>
                </tr>
              </thead>

              {/* Render each expense as a table row */}
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700/50"
                  >
                    {/* Expense date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {formatDate(expense.date)}
                    </td>

                    {/* Description text */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {expense.description}
                    </td>

                    {/* Category with dynamic text color */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`${getCategoryTextColor(
                          expense.category
                        )} font-medium`}
                      >
                        {expense.category.charAt(0).toUpperCase() +
                          expense.category.slice(1)}
                      </span>
                    </td>

                    {/* Amount formatted as currency */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(expense.amount)}
                    </td>

                    {/* Delete button */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
