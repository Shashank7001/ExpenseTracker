import React from "react";
import { useExpenses } from "../context/ExpenseContext";
import { formatCurrency, formatDate } from "../utils/Expenses";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

/**
 * Displays the list of all recorded income entries.
 * Allows users to delete specific income records.
 */
const IncomeList = () => {
  // Access income data and the delete function from global context
  const { income, deleteIncome } = useExpenses();

  // Sort income records by date in descending order (latest first)
  const sortedIncome = [...income].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  /**
   * Handles the deletion of a specific income entry.
   * @param {string} id - The unique identifier of the income record to delete
   */
  const handleDelete = (id) => {
    deleteIncome(id);
    toast.success("Income deleted successfully");
  };

  // If there are no income records, show an empty state message
  if (income.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white via-green-50/20 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-12 text-center border-2 border-green-200/50 dark:border-gray-700">
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          No income records found
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Start tracking your income to see it here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-green-50/20 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-green-200/50 dark:border-gray-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30">
            <tr>
              {/* Column headers */}
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th></th>
            </tr>
          </thead>

          {/* Table body containing income entries */}
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedIncome.map((incomeItem) => (
              <tr
                key={incomeItem.id}
                className="hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors border-b border-gray-100 dark:border-gray-700/50"
              >
                {/* Display income date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {formatDate(incomeItem.date)}
                </td>

                {/* Display income description */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {incomeItem.description}
                </td>

                {/* Display formatted income amount */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(incomeItem.amount)}
                </td>

                {/* Delete button for each income entry */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleDelete(incomeItem.id)}
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
  );
};

export default IncomeList;
